import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Domain.ScreenTimeDomain.rawValue,
  targets: [
    .interface(module: .domain(.ScreenTimeDomain), dependencies: []),
    .implement(module: .domain(.ScreenTimeDomain), dependencies: []),
  ]
)
