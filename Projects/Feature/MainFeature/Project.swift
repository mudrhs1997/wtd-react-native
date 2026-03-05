import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Feature.MainFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.MainFeature),
      dependencies: [
        .feature(target: .MainFeature),
      ]
    ),
    .tests(
      module: .feature(.MainFeature),
      dependencies: [
        .feature(target: .MainFeature),
        .feature(target: .MainFeature, type: .testing),
      ]
    ),
    .implement(
      module: .feature(.MainFeature),
      dependencies: [
        .feature(target: .BaseFeature),
        .feature(target: .MainFeature, type: .interface),
      ]
    ),
    .testing(
      module: .feature(.MainFeature),
      dependencies: [
        .feature(target: .MainFeature, type: .interface),
      ]
    ),
    .interface(
      module: .feature(.MainFeature),
      dependencies: [
      ]
    ),
  ]
)
