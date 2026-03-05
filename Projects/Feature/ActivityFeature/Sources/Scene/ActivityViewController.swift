import UIKit
import SwiftUI
import BaseFeature
import FamilyControls
import DeviceActivity
import ManagedSettings

public final class ActivityViewController: BaseViewController {


    init() {
        super.init(nibName: nil, bundle: nil)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

struct ExampleView: View {
    let selectedApps: Set<ApplicationToken>
    let selectedCategories: Set<ActivityCategoryToken>
    let selectedWebDomains: Set<WebDomainToken>

    @State private var context: DeviceActivityReport.Context = .barGraph
    @State private var filter = DeviceActivityFilter(
        segment: .daily(
            during: Calendar.current.dateInterval(of: .weekOfYear, for: .now)!
        ),
        users: .children,
        devices: .init([.iPhone])
    )

    var body: some View {
        VStack {
            DeviceActivityReport(context, filter: filter)

            Picker(selection: $context, label: Text("Context: ")) {
                Text("Bar Graph")
                    .tag(DeviceActivityReport.Context.barGraph)

                Text("Pie Chart")
                    .tag(DeviceActivityReport.Context.pieChart)
            }

            Picker(selection: $filter.segmentInterval, label: Text("Segment Interval: ")) {
                Text("Hourly")
                    .tag(DeviceActivityFilter.SegmentInterval.hourly())
                Text("Daily")
                    .tag(DeviceActivityFilter.SegmentInterval.daily(during: Calendar.current.dateInterval(of: .weekOfYear, for: .now)!))
            }
        }
        .onAppear {
            filter.applications = self.selectedApps
            filter.categories = self.selectedCategories
            filter.webDomains = self.selectedWebDomains
        }
    }

    private func formantTime(form duration: TimeInterval) -> String? {
        let formatter = DateComponentsFormatter()
        formatter.allowedUnits = [.hour, .minute, .second]
        formatter.unitsStyle = .short
        return formatter.string(from: duration)
    }
}

extension DeviceActivityReport.Context {
    static let barGraph = Self("barGraph")
    static let pieChart = Self("pieChart")
}

