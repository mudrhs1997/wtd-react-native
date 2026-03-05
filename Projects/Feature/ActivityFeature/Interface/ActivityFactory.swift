import BaseFeature


public protocol ActivityFactory {
  func makeCoordinator() -> Coordinator
}
