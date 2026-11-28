# Defeating Android DEX, Unity IL2CPP & Dart AOT Counter-REA Traps

## Known Counter-REA Attack Vectors (`bla`, `AREA`, `DeRea`)
1. **Android DEX String/Type Table Bloating (`AndroidDex.ts`):**
   - `bla` `mobile-game.ts` injects massive decoy string/type entries and recomputes valid DEX `SHA-1` and `Adler32` checksums so static DEX table budgets fill up with bogus classes.
2. **Unity IL2CPP Metadata Decoys (`Il2CppMetadata.ts`, `0xFAB11BAF`):**
   - Injects synthetic `global-metadata.dat` enclave types/methods alongside real C# game/app metadata (or encrypts `global-metadata.dat` at rest and decrypts inside `libil2cpp.so` `MetadataCache::Initialize`).
3. **Dart AOT / Flutter Snapshot Symbol Spoofing (`DartAotSnapshot.ts`):**
   - Spoofs or injects decoy `_kDartVmSnapshotData` / `_kDartIsolateSnapshotInstructions` strings and version profiles to confuse `identify_flutter_build` / `inspect_dart_aot`.
4. **Mobile Anti-RE & WebView Hybrid Decoys (`DeRea`):**
   - Packages encrypted/minified JS assets inside Android WebView shells (`assets/`) with `setJavaScriptEnabled` and decoy assets alongside real decision rules.

## Counter-Measures & Recovery Workflow

1. **Prune DEX Decoys via Entry-Point Reachability (`AndroidManifest.xml` Anchoring):**
   - Never analyze DEX classes in alphabetical/table order!
   - Decode `AndroidManifest.xml` first using `apktool d app.apk` (`inspect_apktool_client` / `decode_android_resources`).
   - Collect ONLY concrete component class names referenced in `<application android:name>`, `<activity>`, `<service>`, `<receiver>`, `<provider>`, and `JNI` native libraries (`System.loadLibrary`).
   - Trace transitive call graphs in `JADX` / Smali starting strictly from those manifest entry classes—all unreferenced bloat classes in the padded DEX table fall away automatically.
2. **Recover Encrypted or Bloated `global-metadata.dat` (Unity IL2CPP):**
   - Check magic bytes (`AF 1B B1 FA` little-endian `0xFAB11BAF`) and version header (`24..31`).
   - If encrypted/corrupted on disk, run dynamic runtime capture via `Frida` hooking `il2cpp_init` / `MetadataCache::Initialize` or use **Zygisk-Il2CppDumper** to dump decrypted `global-metadata.dat` + `dump.cs` directly from process memory once the game initializes!
   - Filter enclave decoy namespaces using runtime call hooks on `GameObject` / `MonoBehaviour` update loops.
3. **Verify Genuine Flutter / Dart AOT Snapshot Headers:**
   - Do not rely solely on `nm`/`strings` for `_kDartVmSnapshot*`; inspect ELF `.rodata` / `.bss` relocations and hash alignment of the actual `libapp.so` snapshot magic (`F5 F5 DC DC` / `0xdcdcf5f5`), and run **Blutter** directly against `libapp.so` + `libflutter.so` to extract authentic Dart object pool and class hierarchy.
4. **Runtime DEX Unpacking (`Frida-DEXDump`):**
   - For packed Android apps (SecNeo, Jiagu, Bangcle, custom `DexClassLoader`), attach `Frida-DEXDump` or hook `OpenMemory` / `DexFile::OpenCommon` in `libart.so` to dump live decrypted `.dex` payloads from memory.
