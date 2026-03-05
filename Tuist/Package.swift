// swift-tools-version: 5.10
import PackageDescription

#if TUIST
import struct ProjectDescription.PackageSettings

let packageSettings = PackageSettings(
  productTypes: [
    "RxSwift": .framework,
    "RxCocoa": .framework,
    "RxCocoaRuntime": .framework,
    "RxRelay": .framework,
    "Swinject": .framework,
    "Alamofire": .framework,
  ]
)
#endif

let package = Package(
  name: "Pupae",
  dependencies: [
    .package(url: "https://github.com/Alamofire/Alamofire", from: "5.0.0"),
    .package(url: "https://github.com/ReactiveX/RxSwift.git", from: "6.0.0"),
    .package(url: "https://github.com/Swinject/Swinject.git", from: "2.8.0"),
    .package(url: "https://github.com/airbnb/lottie-spm.git", from: "4.5.0"),
  ]
)
