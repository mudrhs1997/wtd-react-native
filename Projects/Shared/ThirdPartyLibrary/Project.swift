import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Shared.ThirdPartyLibrary.rawValue,
  targets: [
    .implement(
      module: .shared(.ThirdPartyLibrary),
      dependencies: [
        .external(name: "RxSwift", condition: .none),
        .external(name: "RxCocoa", condition: .none),
        .external(name: "Swinject", condition: .none),
      ]
    ),
  ]
)
