<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GridView.aspx.cs" Inherits="Larko.SharePoint.NestedGrids.Layouts.Larko.SharePoint.NestedGrids.GridView" DynamicMasterPageFile="~masterurl/default.master" %>



<asp:Content ID="Main" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div id="mainDiv">
        <div id="settings">
            <div id="pageSize">
                <label>
                    Show
                <select id="itemsPerPage" data-bind="options: $root.pagingOptions, value: $root.itemsPerPage, event: { change: $root.pagingCountChanged }"></select>
                    entries
                </label>
            </div>
            <div id="search">
                <label>
                    Search:
                <input type="search" id="searchRequests" data-bind="value: searchText, valueUpdate: 'afterkeydown'" />
                </label>
            </div>
        </div>

        <div>
            <div>
                <button data-bind="click: function () { Larko.SharePoint.NestedGrids.Utilities.ShowDialog(Larko.SharePoint.NestedGrids.Constants.Lists.Schools.urlName, null, this); }">Add New School</button>
            </div>
            <table id="schoolTable">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>
                            <a href="#" data-bind="click: function () { $root.sortChanged('name'); }">School Name
                                <img data-bind="attr: { src: $root.getSortImage('name') }" />
                            </a>
                        </th>
                        <th>
                            <a href="#" data-bind="click: function () { $root.sortChanged('dean'); }">Dean
                                <img data-bind="attr: { src: $root.getSortImage('dean') }" />
                            </a>
                            <br />
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                            <select id="deanFilter" data-bind="options: $root.deanOptions,
                                value: $root.filters()['dean'],
                                event: {
                                    change: function (data, event) {
                                        $root.filtersChanged(data, event, '#deanFilter', 'dean');
                                    }
                                }"></select>
                        </th>
                    </tr>
                </thead>
                <tbody data-bind="template: { name: $root.getSchoolTemplate, foreach: pagedSchools, as: 'schoolVM' }">
                </tbody>
            </table>
            <div id="fundCitesPagingBar">
                <a href="#" data-bind="click: $root.previousPage, visible: $root.hasPreviousPage">Previous</a>

                <!-- ko foreach: {data: totalPagesHolder, as: 'page' }-->
                <a href="#" data-bind="click: function () { $root.jumpToPage(page) }">
                    &nbsp;<span data-bind="text: page">&nbsp;</span>
                </a>
                <!-- /ko -->
                <a href="#" data-bind="click: $root.nextPage, visible: $root.hasNextPage">Next</a>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        var mainVM;

        ExecuteOrDelayUntilScriptLoaded(function () {
            mainVM = new Larko.SharePoint.NestedGrids.MainViewModel();

            ko.applyBindings(mainVM);
        }, "sp.js");
    </script>
</asp:Content>

<asp:Content ID="PageTitle" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    Grid Demo
</asp:Content>

<asp:Content ID="PageTitleInTitleArea" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Grid Demo
</asp:Content>

<asp:Content ID="PageHead" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/jquery-1.8.3.min.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/jquery-ui.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/knockout-3.3.0.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/toastr.min.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/Constants.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/DataObjects.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/BaseObjects.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/Extensions.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/Utilities.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/MainViewModel.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/SchoolViewModel.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/DepartmentGridViewModel.js" />
    <SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/DepartmentViewModel.js" />
    <SharePoint:CssLink runat="server" DefaultUrl="/_layouts/Larko.SharePoint.NestedGrids/css/NestedGrids.css"></SharePoint:CssLink>
    <SharePoint:CssLink runat="server" DefaultUrl="/_layouts/Larko.SharePoint.NestedGrids/css/toastr.css"></SharePoint:CssLink>
    <%--<SharePoint:ScriptLink runat="server" Name="/_layouts/Larko.SharePoint.NestedGrids/Scripts/js/Utilities.js"/>
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />--%>


    <script type="text/html" id="schoolEditTemplate">
        <tr>
            <td>
                <a href="#" data-bind="click: function () { schoolVM.expandSchool(schoolVM.school()); }">
                    <img data-bind="attr: { src: schoolVM.school().isExpanded() ? '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_close.png' : '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_open.png' }" />
                </a>
            </td>
            <td>
                <a href="#" data-bind="click: function () { schoolVM.saveSchool(schoolVM.school()); }, visible: schoolVM.isSchoolEditing(schoolVM.school())">Save</a>
                <a href="#" data-bind="click: function () { schoolVM.cancelSchool(schoolVM.school()); }, visible: schoolVM.isSchoolEditing(schoolVM.school())">Cancel</a>
            </td>
            <td>
                <input type="text" data-bind="value: schoolVM.school().name.editValue, visible: schoolVM.isSchoolEditing(schoolVM.school())" />
            </td>
            <td>
                <input type="text" data-bind="value: schoolVM.school().dean.editValue, visible: schoolVM.isSchoolEditing(schoolVM.school())" />
            </td>
        </tr>
        <tr data-bind="template: { name: 'schoolExpansionTemplate', 'if': schoolVM.school().isExpanded() }">
        </tr>
    </script>
    <script type="text/html" id="schoolReadTemplate">
        <tr>
            <td>
                <a href="#" data-bind="click: function () { schoolVM.expandSchool(schoolVM.school()); }">
                    <img data-bind="attr: { src: schoolVM.school().isExpanded() ? '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_close.png' : '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_open.png' }" />
                </a>
            </td>
            <td>
                <a href="#" data-bind="click: function () { schoolVM.editSchool(schoolVM.school()); }, visible: !schoolVM.isSchoolEditing(schoolVM.school())">Edit</a>
                <a href="#" data-bind="click: function () { $root.deleteSchoolVM(schoolVM); }, visible: !schoolVM.isSchoolEditing(schoolVM.school())">Delete</a>
            </td>
            <td>
                <label data-bind="text: schoolVM.school().name, visible: !schoolVM.isSchoolEditing(schoolVM.school())" />
            </td>
            <td>
                <label data-bind="text: schoolVM.school().dean, visible: !schoolVM.isSchoolEditing(schoolVM.school())" />
            </td>
        </tr>
        <tr data-bind="template: { name: 'schoolExpansionTemplate', 'if': schoolVM.school().isExpanded() }">
        </tr>
    </script>
    <script type="text/html" id="schoolExpansionTemplate">
        <td colspan="4">
            <button data-bind="click: function () { Larko.SharePoint.NestedGrids.Utilities.ShowDialog(Larko.SharePoint.NestedGrids.Constants.Lists.Departments.urlName, schoolVM.school().id, schoolVM.departmentGrid); }">Add New Department</button>
            <table data-bind="attr: { id: 'school' + schoolVM.school().id.toString() + 'DepartmentsTable' }, with: schoolVM.departmentGrid">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>
                            <a href="#" data-bind="click: function () { sortChanged('name'); }">Department Name
                            </a>
                        </th>
                        <th>
                            <a href="#" data-bind="click: function () { sortChanged('departmentHead'); }">Department Head
                            </a>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                            <select data-bind="attr: { id: 'school' + schoolVM.school().id.toString() + 'DepartmentFilter' },
    options: departmentHeadOptions,
    value: filters()['departmentHead'],
    event: {
        change: function (data, event) { filtersChanged(data, event, '#school' + schoolVM.school().id.toString() + 'DepartmentFilter', 'departmentHead'); }
    }">
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody data-bind="template: { name: getDepartmentTemplate, foreach: filteredDepartments, as: 'departmentVM' }"></tbody>
            </table>
        </td>
    </script>



    <script type="text/html" id="departmentEditTemplate">
        <tr>
            <td>
                <%--<a href="#" data-bind="click: function () { departmentVM.expandDepartment(departmentVM.department()); }">
                    <img data-bind="attr: { src: departmentVM.department().isExpanded() ? '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_close.png' : '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_open.png' }" />
                </a>--%>
            </td>
            <td>
                <a href="#" data-bind="click: function () { departmentVM.saveDepartment(departmentVM.department()); }, visible: departmentVM.isDepartmentEditing(departmentVM.department())">Save</a>
                <a href="#" data-bind="click: function () { departmentVM.cancelDepartment(departmentVM.department()); }, visible: departmentVM.isDepartmentEditing(departmentVM.department())">Cancel</a>
            </td>
            <td>
                <input type="text" data-bind="value: departmentVM.department().name.editValue, visible: departmentVM.isDepartmentEditing(departmentVM.department())" />
            </td>
            <td>
                <input type="text" data-bind="value: departmentVM.department().departmentHead.editValue, visible: departmentVM.isDepartmentEditing(departmentVM.department())" />
            </td>
        </tr>
        <tr data-bind="if: departmentVM.department().isExpanded()">
        </tr>
    </script>
    <script type="text/html" id="departmentReadTemplate">
        <tr>
            <td>
                <%--<a href="#" data-bind="click: function () { departmentVM.expandDepartment(departmentVM.department()); }">
                    <img data-bind="attr: { src: departmentVM.department().isExpanded() ? '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_close.png' : '/sites/SPSSA/_layouts/Larko.SharePoint.NestedGrids/css/details_open.png' }" />
                </a>--%>
            </td>
            <td>
                <a href="#" data-bind="click: function () { departmentVM.editDepartment(departmentVM.department()); }, visible: !departmentVM.isDepartmentEditing(departmentVM.department())">Edit</a>
                <a href="#" data-bind="click: function () { $parent.deleteDepartmentVM(departmentVM); }, visible: !departmentVM.isDepartmentEditing(departmentVM.department())">Delete</a>
            </td>
            <td>
                <label data-bind="text: departmentVM.department().name, visible: !departmentVM.isDepartmentEditing(departmentVM.department())" />
            </td>
            <td>
                <label data-bind="text: departmentVM.department().departmentHead, visible: !departmentVM.isDepartmentEditing(departmentVM.department())" />
            </td>
        </tr>
        <tr data-bind="if: departmentVM.department().isExpanded()">
        </tr>
    </script>
    <script type="text/html" id="departmentExpansionTemplate">
        <td>
            <table data-bind="attr: { id: 'department' + departmentVM.department().id.toString() + 'DepartmentsTable' }, with: departmentVM.departments">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>
                            <a href="#" data-bind="click: function () { sortChanged('name'); }">Department Name
                            </a>
                        </th>
                        <th>
                            <a href="#" data-bind="click: function () { sortChanged('departmentHead'); }">Department Head
                            </a>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                            <%--<select data-bind="attr: { id: 'department' + departmentVM.department().id.toString() + 'DepartmentFilter' },
                                                options: departmentHeadOptions,
                                                value: filters()['departmentHead'],
                                                event: {
                                                    change: function (data, event) { filtersChanged(data, event, '#department' + departmentVM.department().id.toString() + 'DepartmentFilter', 'departmentHead'); }
                            }">

                            </select>--%>
                        </th>
                    </tr>
                </thead>
                <%--<tbody data-bind="template: { name: getDepartmentTemplate, foreach: filteredDepartments, as: 'departmentVM' }"></tbody>--%>
            </table>
        </td>
    </script>
</asp:Content>
