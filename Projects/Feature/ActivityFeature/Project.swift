import DependencyPlugin
import ProjectDescription
import ProjectDescriptionHelpers


let project = Project(
  name: Module.Feature.ActivityFeature.rawValue,
  targets: [
    .demo(
      module: .feature(.ActivityFeature),
      dependencies: [
        .feature(target: .ActivityFeature),
      ],
      hasEntitlements: true
    ),
    .tests(
      module: .feature(.ActivityFeature),
      dependencies: [
        .feature(target: .ActivityFeature),
        .feature(target: .ActivityFeature, type: .testing),
      ]),
    .implement(
      module: .feature(.ActivityFeature),
      dependencies: [
        .feature(target: .ActivityFeature, type: .interface),
      ]),
    .testing(
      module: .feature(.ActivityFeature),
      dependencies: [
        .feature(target: .ActivityFeature, type: .interface)
      ]),
    .interface(
      module: .feature(.ActivityFeature),
      dependencies: [
        .feature(target: .BaseFeature),
      ]),
  ]
)


