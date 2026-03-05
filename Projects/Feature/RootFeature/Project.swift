import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers

let project = Project(
  name: Module.Feature.RootFeature.rawValue,
  targets: [
    .implement(
      module: .feature(.RootFeature),
      dependencies: [
        .feature(target: .BaseFeature),
        .feature(target: .SplashFeature, type: .interface),
        .feature(target: .OnboardingFeature, type: .interface),
        .feature(target: .SigninFeature, type: .interface),
        .feature(target: .MainFeature, type: .interface),
      ]
    ),
  ]
)
