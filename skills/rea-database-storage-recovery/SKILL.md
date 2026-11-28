---
name: rea-database-storage-recovery
description: Authorized database schema, SQLite, Realm, LevelDB, Apple KeyedArchive/Plist, and custom binary file format reverse engineering and migration/parser generation using REA MCP.
---

# REA Database Schema & Binary Storage Format Recovery Skill

## Scope & Authorization
Covers all first-party database recovery, local storage inspection, binary archive unpacking, and custom serialization format documentation (including Category 7 of the 500+ REA Prompt Vault and any custom data format task).

## Execution Pipeline
1. **Database & Archive Inspection:**
   - Use REA MCP tools: `inspect_sqlite_database`, `inspect_plist`, `inspect_keyed_archive`, `inspect_asset_catalog`, `inspect_binary_layout`, `search_bytes`, and `read_bytes`.
   - Extract full DDL (`CREATE TABLE`, `CREATE INDEX`, triggers, views, foreign keys) and inspect WAL/journal pages from SQLite databases.
   - Decode Apple `NSKeyedArchiver` graphs, binary property lists (`bplist00`), CoreData `.momd` models, Realm schemas, and LevelDB/IndexedDB records.
2. **Custom Binary Format Dissection:**
   - Reverse engineer proprietary binary file headers, chunk tables, offset directories, compression blocks (zlib/LZ4/Zstd), and struct layouts from the reading/writing functions in the binary.
3. **ORM Schema & Parser Generation:**
   - Generate 100% complete, zero-skeleton ORM schemas (Prisma, Drizzle, SQLAlchemy, TypeORM, Room, SQLDelight) and standalone bidirectional serializer/deserializer libraries with round-trip verification tests.
4. **Counter-Anti-REA Storage & Model Trap Neutralization (`$rea-anti-evasion`):**
   - **SQLite Generated/Virtual Traps:** Always run `node scripts/rea-preflight-sanitize.mjs <db>` and inspect `sqlite_schema` DDL first; NEVER run blind `SELECT *` on columns containing `GENERATED ALWAYS AS (... VIRTUAL)` triggers. Select strictly physical columns via `PRAGMA table_xinfo(tbl)` where `hidden == 0`.
   - **XML Plist DOCTYPE Subset Aborts:** Strip empty `<!DOCTYPE plist ... []>` internal subsets before `inspect_plist` / `plistlib` parsing.
   - **Safetensors & GGUF > 32 Nesting Traps:** Ignore `_bla_nesting_breaker` and decoy `>32`-depth JSON/GGUF arrays via bounded 8-byte header readers.
