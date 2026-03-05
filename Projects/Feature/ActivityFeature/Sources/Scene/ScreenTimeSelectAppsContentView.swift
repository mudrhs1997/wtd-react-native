import SwiftUI
import FamilyControls

struct ScreenTimeSelectAppsContentView: View {
    @State var model: ActivityViewModel
    @State var isPresented = false

    var body: some View {
        VStack {

            Button("Present FamilyActivity") {
                isPresented = true
            }
            .sheet(isPresented: $isPresented) {
                SelectionView(selection: $model.selection, isPresented: $isPresented) {
                    model.setShieldRestrictions()
                }
                .presentationDragIndicator(.visible)
            }
        }
    }
}

struct SelectionView: View {
    @Binding var selection: FamilyActivitySelection
    @Binding var isPresented: Bool
    let setRestrictionApplications: () -> Void

    var body: some View {
        VStack {
            HStack {
                Spacer()

                Button("Done") {
                    setRestrictionApplications()
                    isPresented = false
                }
                .padding()
            }

            FamilyActivityPicker(selection: $selection)
        }
    }
}
