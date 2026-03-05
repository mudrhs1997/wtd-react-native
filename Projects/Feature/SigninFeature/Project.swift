import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Feature.SigninFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.SigninFeature),
      dependencies: [
        .feature(target: .SigninFeature),
      ]
    ),
    .tests(
      module: .feature(.SigninFeature),
      dependencies: [
        .feature(target: .SigninFeature),
        .feature(target: .SigninFeature, type: .testing),
      ]
    ),
    .implement(
      module: .feature(.SigninFeature),
      dependencies: [
        .feature(target: .BaseFeature),
        .feature(target: .SigninFeature, type: .interface),
      ]
    ),
    .testing(
      module: .feature(.SigninFeature),
      dependencies: [
        .feature(target: .SigninFeature, type: .interface),
      ]
    ),
    .interface(
      module: .feature(.SigninFeature),
      dependencies: [
      ]
    ),
  ]
)
