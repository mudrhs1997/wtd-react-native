import ProjectDescription

public extension ProjectDescription.Path {
  static func relativeToFeature(_ path: String) -> Self {
    .relativeToRoot("Projects/Feature/\(path)")
  }

  static func relativeToDomain(_ path: String) -> Self {
    .relativeToRoot("Projects/Domain/\(path)")
  }

  static func relativeToData(_ path: String) -> Self {
    .relativeToRoot("Projects/Data/\(path)")
  }

  static func relativeToCore(_ path: String) -> Self {
    .relativeToRoot("Projects/Core/\(path)")
  }

  static func relativeToShared(_ path: String) -> Self {
    .relativeToRoot("Projects/Shared/\(path)")
  }
}
