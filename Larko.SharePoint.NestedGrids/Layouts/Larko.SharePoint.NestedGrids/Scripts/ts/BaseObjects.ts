module Larko.SharePoint.NestedGrids {
    export class GridViewModel {
        //#region Class level variales and constructor

        //#region Paging
        currentPage = ko.observable<number>(0);
        itemsPerPage = ko.observable<number>(null);
        totalPagesHolder = ko.observableArray<number>(null);
        //#endregion

        //#region Sort and Filter
        sortField = ko.observable<Larko.SharePoint.NestedGrids.Sort>();
        searchText = ko.observable<string>("");
        filters = ko.observableArray<Larko.SharePoint.NestedGrids.Filter>();

        //#endregion
        //#endregion

        //#region Events
        //#region Sort and Filter Events
        filtersChanged(data, event, filterControl, field) {
            var value = $(filterControl + " option:selected").text();

            if (value && (value !== "" || value !== "All")) {
                this.filters.push({
                    field: field,
                    value: value
                });
            }
            else {

                var existingFilter = ko.utils.arrayFirst(this.filters(), function (item: Filter) {
                    if (item.field === field)
                        return true;
                    else
                        return false;
                });

                if (!Utilities.isObjectNullorUndefined(existingFilter))
                    this.filters.remove(existingFilter);
            }

            this.currentPage(0);
        }

        sortChanged(sortField: string) {
            var currSortField = "";
            var currSortAsc = true;

            if (!Utilities.isObjectNullorUndefined(this.sortField) && !Utilities.isObjectNullorUndefined(this.sortField())) {
                currSortField = this.sortField().sortField;
                currSortAsc = this.sortField().sortAsc;
            }

            if (currSortField === sortField) {
                this.sortField({
                    sortField: currSortField,
                    sortAsc: !currSortAsc
                });
            }
            else {
                this.sortField({
                    sortField: sortField,
                    sortAsc: true
                });
            }
        }

        getSortImage(sortField: string) {
            if (!Utilities.isObjectNullorUndefined(this.sortField) && !Utilities.isObjectNullorUndefined(this.sortField()) && this.sortField().sortField === sortField) {
                if (this.sortField().sortAsc)
                    return "/sites/spssa/_layouts/Larko.SharePoint.NestedGrids/css/uparrow.png";
                else
                    return "/sites/spssa/_layouts/Larko.SharePoint.NestedGrids/css/downarrow.png";
            }
            else {
                return "/sites/spssa/_layouts/images/blank.gif";
            }
        }
        //#endregion

        //#endregion
    }

    export class ItemViewModel {
        
    }
}