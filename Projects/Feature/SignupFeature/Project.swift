import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Feature.SignupFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.SignupFeature),
      dependencies: [
        .feature(target: .SignupFeature),
      ]
    ),
    .tests(
      module: .feature(.SignupFeature),
      dependencies: [
        .feature(target: .SignupFeature),
        .feature(target: .SignupFeature, type: .testing),
      ]
    ),
    .implement(
      module: .feature(.SignupFeature),
      dependencies: [
        .feature(target: .BaseFeature),
        .feature(target: .SignupFeature, type: .interface),
      ]
    ),
    .testing(
      module: .feature(.SignupFeature),
      dependencies: [
        .feature(target: .SignupFeature, type: .interface),
      ]
    ),
    .interface(
      module: .feature(.SignupFeature),
      dependencies: [
      ]
    ),
  ]
)
