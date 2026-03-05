import Foundation
import FamilyControls
import BaseFeature
import DeviceActivity
import RxSwift
import ManagedSettings


final class ActivityViewModel: ObservableObject {
//    private let myMonitor = MyMonitor()
    private let store = ManagedSettingsStore()
    @Published var selection = FamilyActivitySelection()

    init() {
        selection = self.loadSelection() ?? FamilyActivitySelection()
    }

    struct Input {

    }

    struct Output {
    }


    func transform(input: Input) -> Output {
        let output = Output()
        return output
    }

    func setShieldRestrictions() {
        let applications = selection.applicationTokens

        store.shield.applications = applications

        saveSelection(selection)

//        print("선택된 앱의 수: \(applications)")
            print("✅ 차단할 앱: \(applications.count)")
    }

    func saveSelection(_ selection: FamilyActivitySelection) {
        let defaults = UserDefaults.standard
        let encoder = PropertyListEncoder()

        defaults.set(
            try? encoder.encode(selection),
            forKey: "selection"
        )
    }

    func loadSelection() -> FamilyActivitySelection? {
        let defaults = UserDefaults.standard
        let decoder = PropertyListDecoder()

        guard let data = defaults.data(forKey: "selection") else {
            print("UserDefaults Error")
            return nil
        }

        return try? decoder.decode(FamilyActivitySelection.self, from: data)
    }

}
