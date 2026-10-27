---
name: rea-mobile-app-recovery
description: Authorized reverse engineering and full project recovery for Android (APK/AAB/DEX/JNI/Flutter/React Native) and iOS (IPA/Mach-O/Swift/ObjC) mobile applications using REA MCP, JADX, Apktool, and native symbol analysis.
---

# REA Mobile App Recovery Skill (Android APK & iOS IPA)

## Scope & Authorization
Covers all first-party mobile application reverse engineering, lost source code reconstruction, and security debugging for Android and iOS (including Category 3 of the 500+ REA Prompt Vault and any custom mobile app task).

## Execution Pipeline
1. **Android APK / AAB / DEX / Native JNI Recovery:**
   - Use REA MCP tools: `inspect_android_package`, `search_android_classes`, `inspect_android_class`, `inspect_android_method`, `trace_android_references`, `decode_android_resources`, and `project_android_application_graph`.
   - For Flutter/Dart apps: use `identify_flutter_build` and `inspect_dart_aot` to recover Dart package classes, state management (Riverpod/Bloc), and widget trees.
   - For JNI `.so` native libraries: use `open_binary`, `list_procedures`, and `procedure_pseudo_code` to map `Java_*` and `RegisterNatives` bridges.
   - Reconstruct a complete, compilable Android Studio / Gradle project (`app/src/main/java/`, `res/`, `AndroidManifest.xml`, `build.gradle.kts`) in clean Kotlin & Jetpack Compose or XML.
2. **iOS IPA / Mach-O / Swift / Objective-C Recovery:**
   - Use REA MCP tools: `inspect_macho`, `inspect_signature`, `inspect_plist`, `get_objc_classes`, `get_objc_protocols`, `analyze_swift_types`, `demangle_swift`, `decode_interface_builder`, `inspect_asset_catalog`, and `project_apple_application_graph`.
   - Reconstruct clean Swift / SwiftUI / UIKit source files, Storyboards, `Info.plist`, and asset catalogs (`Assets.xcassets`).
3. **Zero-Skeleton Verification:**
   - Output 100% complete mobile source files without placeholders or `// TODO` stubs, and verify build configuration integrity.
