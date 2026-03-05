import ProjectDescription

public struct ProjectEnvironment {
  public let name: String
  public let organizationName: String
  public let deploymentTargets: DeploymentTargets
  public let destination: Set<Destination>
  public let baseSetting: SettingsDictionary
}

public let environment = ProjectEnvironment(
  name: "Pupae",
  organizationName: "io.butterple",
  deploymentTargets: .iOS("16.0"),
  destination: .iOS,
  baseSetting: [:]
)
