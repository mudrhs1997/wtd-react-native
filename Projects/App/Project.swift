import DependencyPlugin
import EnvironmentPlugin
import ProjectDescription

let infoPlist: [String: Plist.Value] = [
  "UILaunchStoryboardName": "LaunchScreen", // Launch screen configuration
  "CFBundleVersion": "1", // Prevent bundle version error
  "UIApplicationSceneManifest": [
    "UIApplicationSupportsMultipleScenes": true,
    "UISceneConfigurations": [
      "UIWindowSceneSessionRoleApplication": [
        [
          "UISceneClassName": "UIWindowScene",
          "UISceneDelegateClassName": "$(PRODUCT_MODULE_NAME).SceneDelegate",
        ],
      ],
    ],
  ],
]

let project = Project(
  name: environment.name,
  targets: [
    // MARK: - App

    .target(
      name: environment.name,
      destinations: environment.destination,
      product: .app,
      bundleId: "\(environment.organizationName).\(environment.name)",
      deploymentTargets: environment.deploymentTargets,
      infoPlist: .extendingDefault(
        with: infoPlist
      ),
      sources: ["Sources/**"],
      resources: ["Resources/**"],
      entitlements: "Pupae.entitlements",
      dependencies: Module.Feature.allCases.map { .feature(target: $0) }
        + [
        ],
      settings: .settings(configurations: [
        .debug(name: "Debug"),
        .release(name: "Release"),
      ])
    ),

    // MARK: - Tests

    .target(
      name: "\(environment.name)UnitTests",
      destinations: environment.destination,
      product: .unitTests,
      bundleId: "\(environment.organizationName).\(environment.name)",
      infoPlist: .default,
      sources: ["Tests/**"],
      dependencies: [
        .target(name: environment.name, status: .optional, condition: .none),
      ]
    ),
  ]
)
