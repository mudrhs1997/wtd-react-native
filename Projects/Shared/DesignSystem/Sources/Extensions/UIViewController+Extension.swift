import SwiftUI

#if DEBUG
extension UIViewController {
  private struct Preview: UIViewControllerRepresentable {
    let viewController: UIViewController

    func makeUIViewController(context _: Context) -> UIViewController {
      viewController
    }

    func updateUIViewController(_: UIViewController, context _: Context) {}
  }

  func toPreview() -> some View {
    Preview(viewController: self)
  }
}
#endif
