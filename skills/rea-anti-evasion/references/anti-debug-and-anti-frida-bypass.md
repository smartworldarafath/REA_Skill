# Anti-Debug, Anti-Frida & Capture Saturation Bypass

## Known Counter-REA Attack Vectors
1. **Anti-Frida Defenses (`AREA`):**
   - Actively probes TCP `127.0.0.1:27042` (`frida-server` default port), scans `/proc/self/maps` / loaded modules for `frida-agent`, `frida-gadget`, `linjector`, `gum-js-loop`, and inspects D-Bus for Frida artifacts.
2. **Frida IPC Capture Saturation (`bla` `fridaCaptureLimits.ts`):**
   - Intentionally emits 68+ level nested JSON objects and >34 KiB message strings at runtime hooks to exceed REA's `MAX_JSON_DEPTH = 64` and `MAX_MESSAGE_TEXT_BYTES = 32 KiB`, dropping real telemetry.
3. **Anti-Debug Guards (`AREA`):**
   - Linux/macOS: `ptrace(PTRACE_TRACEME)` / `PT_DENY_ATTACH`, `TracerPid` polling in `/proc/self/status`, timing deltas (`rdtsc`/`clock_gettime`), stripped `get-task-allow` entitlement + Hardened Runtime on macOS.
   - Windows: `IsDebuggerPresent`, `CheckRemoteDebuggerPresent`, `NtQueryInformationProcess(ProcessDebugPort)`, `PEB.BeingDebugged` / `NtGlobalFlag`, hardware breakpoint DR0–DR3 checks.

## Counter-Measures & Recovery Workflow

1. **Stealth Frida Deployment:**
   - Never run `frida-server` on default port `27042`: bind to a non-default port (`frida-server -l 127.0.0.1:31337`) and rename the binary (e.g. `helper-daemon`).
   - On Android/Linux, prefer **Florida / Hluda** (stealth Frida patches removing `frida-*` thread names, D-Bus signatures, and `/proc/self/maps` markers) or **Zygisk-Frida** gadget injection.
   - On targets checking `/proc/self/maps` or `openat` for `frida`, hook `strstr`, `openat`, `read`, or `connect` early via `LD_PRELOAD` or early-spawn (`frida -f`) before anti-Frida threads initialize.
2. **Defeating Frida Capture Saturation (`MAX_JSON_DEPTH = 64`, `32 KiB`):**
   - **NEVER** pass raw untrusted target objects directly into `send(obj)` inside Frida scripts!
   - Include a safe bounded serializer in every Frida hook: clamp object recursion depth to `<= 16`, clip large strings/buffers to `<= 4096` chars (hex-chunking binary buffers over multiple numbered `send({ chunkIdx, data })` packets `< 16 KiB`), and strip cyclical references before `send()`.
3. **Bypassing Native Anti-Debug:**
   - **Windows:** Use `x64dbg` + **ScyllaHide** plugin (automatically hides PEB flags, `NtQueryInformationProcess`, `rdtsc`, and DR registers).
   - **Linux:** Use **eBPF (`bpftrace` / `uprobes`)** or **`strace` / `LD_PRELOAD`** which bypass user-space `ptrace(PTRACE_TRACEME)` self-checks (for `eBPF`), or patch `PTRACE_TRACEME` / `PT_DENY_ATTACH` calls to `NOP` returning `0` in an authorized working copy.
   - **macOS Hardened Runtime:** On user-owned binaries, inspect static Mach-O in Ghidra/Hopper or re-sign a local owner test copy with `codesign --force --sign - --entitlements debug.plist` enabling `com.apple.security.get-task-allow` for LLDB/Frida attachment.
