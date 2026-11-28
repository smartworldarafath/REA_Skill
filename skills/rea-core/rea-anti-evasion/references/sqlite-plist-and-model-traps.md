# Neutralizing SQLite Virtual Traps, XML Plist Aborts, Model Nesting Bombs & .NET Floods

## Known Counter-REA Attack Vectors (`bla`, `AREA`, `anti-rea-forge`)
1. **SQLite Generated/Virtual Column Traps (`SqliteDatabaseInspection.ts`):**
   - `bla` injects `GENERATED ALWAYS AS (enclave_unseal_payload(...)) VIRTUAL` columns, recursive triggers, or custom virtual table modules so naive `SELECT *` queries fail or trigger unwanted SQL evaluation (`sqlite_eval_trap`).
2. **XML Property List DOCTYPE Abort (`PropertyListDecodeBudget.ts`):**
   - Injects `<!DOCTYPE plist ... []>` with an empty internal subset `[]` so strict budget parsers (`token.doctype && token.internalSubset`) abort reading genuine Apple `.plist` settings.
3. **Safetensors & GGUF > 32 Nesting Bombs (`SafetensorsHeader.ts`, `GgufHeader.ts`):**
   - Embeds a 35-level nested JSON array under `_bla_nesting_breaker` in `.safetensors` headers or 35-frame nested GGUF `ARRAY` metadata entries to exceed `MODEL_JSON_NESTING = 32` / `MODEL_METADATA_NESTING = 32` while preserving genuine tensors.
4. **.NET Managed Metadata Floods (`ManagedDecodeBudget.ts`):**
   - Bloats CLR `#Strings` / `#US` heaps and TypeDef/ImplMap rows to saturate `reserveRow = 256` and `reserveString = 6x + 2` in managed inspectors.

## Counter-Measures & Recovery Workflow

1. **Schema-First Safe SQLite Inspection:**
   - **NEVER** execute `SELECT *` on an uninspected third-party/hardened SQLite database!
   - First extract raw schema text cleanly via:
     ```sql
     SELECT type, name, tbl_name, sql FROM sqlite_schema WHERE sql IS NOT NULL;
     ```
     or run `scripts/rea-preflight-sanitize.mjs <file.sqlite>` which checks raw DDL patterns for `GENERATED ALWAYS AS` / `VIRTUAL` / `CREATE VIRTUAL TABLE`.
   - When querying data, explicitly select **only concrete physical columns** (`SELECT col1, col2 FROM table`) via `PRAGMA table_xinfo(table)` filtering `hidden == 0`, completely skipping `hidden == 2` (virtual generated) and `hidden == 3` (stored generated) columns!
   - If encrypted via SQLCipher (`AREA`), inspect binary key derivation / passphrase setup in the host app rather than brute-forcing raw database bytes.

2. **Plist DOCTYPE Internal Subset Sanitization:**
   - If `inspect_plist` aborts on `<!DOCTYPE plist ... []>`, copy the `.plist` to a scratch path, strip the empty `[]` internal subset (`<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`), convert with `plutil -convert xml1` or Python `plistlib`, and inspect the clean copy.

3. **Safe Safetensors / GGUF Header Extraction:**
   - Read the exact 8-byte little-endian header length prefix of `.safetensors` (Python `struct.unpack('<Q', f.read(8))`), parse JSON with a higher recursion/depth allowance in Python/Node, delete any `_bla_*` decoy nesting keys, and dump real tensor names, shapes, dtypes, and offsets.
   - For `.gguf`, use `gguf-py` / bounded metadata reader that skips nested array keys exceeding depth 32 and prints only standard architecture/tokenizer/tensor metadata.

4. **Bypassing `.NET` Metadata Decode Caps:**
   - If REA MCP `inspect_managed_artifact` hits `ManagedDecodeBudget`, fall back directly to CLI **`ilspycmd -p -o out_dir/ target.dll`** or **`dnSpyEx`** (which stream CLR metadata without arbitrary 256-row limits) and run reachability pruning from `Main` / public controller classes.
