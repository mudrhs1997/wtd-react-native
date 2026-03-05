import UIKit
import ManagedSettings
import ManagedSettingsUI
//
//class ShieldActionExtension: ShieldActionDelegate {
//  override func handle(action: ShieldAction, for application: ApplicationToken, completionHandler: @escaping (ShieldActionResponse) -> Void) {
//    switch action {
//    case .primaryButtonPressed:
//      completionHandler(.close)
//    case .secondaryButtonPressed:
//      completionHandler(.defer)
//    @unknown default:
//      fatalError()
//    }
//  }
//}


class ShieldActionExtension: ShieldConfigurationDataSource {
  override func configuration(shielding application: Application) -> ShieldConfiguration {
    return ShieldConfiguration(
      backgroundBlurStyle: .prominent,
      backgroundColor: .yellow,
      icon: .checkmark,
      title: .init(text: "Title", color: .green),
      subtitle: .init(text: "Subtitle", color: .black),
      primaryButtonLabel: .init(text: "Primary", color: .brown),
      primaryButtonBackgroundColor: .blue,
      secondaryButtonLabel: .init(text: "Secondary", color: .darkGray)
    )
  }
    override func configuration(shielding application: Application, in category: ActivityCategory) -> ShieldConfiguration {
        return ShieldConfiguration(
          backgroundBlurStyle: .prominent,
          backgroundColor: .yellow,
          icon: .checkmark,
          title: .init(text: "Title", color: .green),
          subtitle: .init(text: "Subtitle", color: .black),
          primaryButtonLabel: .init(text: "Primary", color: .brown),
          primaryButtonBackgroundColor: .blue,
          secondaryButtonLabel: .init(text: "Secondary", color: .darkGray)
        )
    }
}
