import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers


let project = Project(
  name: Module.Feature.HomeFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.HomeFeature),
      dependencies: [
        .feature(target: .HomeFeature),
      ]),
    .tests(
      module: .feature(.HomeFeature),
      dependencies: [
        .feature(target: .HomeFeature),
        .feature(target: .HomeFeature, type: .testing),
      ]),
    .implement(
      module: .feature(.HomeFeature),
      dependencies: [
        .feature(target: .BaseFeature),
        .feature(target: .HomeFeature, type: .interface),
      ]),
    .testing(
      module: .feature(.HomeFeature),
      dependencies: [
        .feature(target: .HomeFeature, type: .interface)
      ]),
    .interface(
      module: .feature(.HomeFeature),
      dependencies: [

      ]),
  ]
)


