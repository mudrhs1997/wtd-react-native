import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Feature.SplashFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.SplashFeature),
      dependencies: [
        .feature(target: .SplashFeature),
      ]
    ),
    .tests(
      module: .feature(.SplashFeature),
      dependencies: [
        .feature(target: .SplashFeature),
        .feature(target: .SplashFeature, type: .testing),
      ]
    ),
    .implement(
      module: .feature(.SplashFeature),
      dependencies: [
        .feature(target: .SplashFeature, type: .interface),
      ]
    ),
    .testing(
      module: .feature(.SplashFeature),
      dependencies: [
        .feature(target: .SplashFeature, type: .interface),
      ]
    ),
    .interface(
      module: .feature(.SplashFeature),
      dependencies: [
        .feature(target: .BaseFeature),
      ]
    ),
  ]
)
