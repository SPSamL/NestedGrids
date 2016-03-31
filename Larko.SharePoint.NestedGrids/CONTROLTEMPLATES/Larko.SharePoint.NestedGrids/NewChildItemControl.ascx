<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %> 
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="NewChildItemControl.ascx.cs" Inherits="Larko.SharePoint.NestedGrids.NewChildItemControl" %>
<!-- NOTE: the following line is important for attachments because SP will automatically 
           hide the "part1" span when Add Attachments is clicked. -->
<span id="part1">
    <table border="0" cellspacing="0" width="100%">
        <SharePoint:ListFieldIterator ID="listFieldIterator" runat="server" ControlMode="New" />

        <!-- Attachments -->
        <tr id="idAttachmentsRow">
            <td nowrap="true" valign="top" class="ms-formlabel" width="20%">
                <SharePoint:FieldLabel ID="FieldLabel1" ControlMode="New" FieldName="Attachments" runat="server" />
            </td>
            <td valign="top" class="ms-formbody" width="80%">
                <SharePoint:FormField runat="server" ID="AttachmentsField" ControlMode="New" FieldName="Attachments" />
                <script language="javascript" type="text/javascript">
                    var elm = document.getElementById("idAttachmentsTable");
                    if (elm == null || elm.rows.length == 0)
                        document.getElementById("idAttachmentsRow").style.display = 'none';
                </script>
            </td>
        </tr>
    </table>
    <br />
    <br />
    <table width="100%" border="0" cellspacing="0">
        <!-- "Save" and "Cancel" buttons -->
        <tr>
            <td width="99%" class="ms-toolbar" nowrap="nowrap">
                <img src="/_layouts/images/blank.gif" width="1" height="18" />
            </td>
            <td class="ms-toolbar" nowrap="nowrap">
                <SharePoint:SaveButton runat="server" ControlMode="New" ID="savebutton" />
            </td>
            <td class="ms-separator"></td>
            <td class="ms-toolbar" nowrap="nowrap" align="right">
                <SharePoint:GoBackButton runat="server" ControlMode="New" ID="gobackbutton" />
            </td>
        </tr>
    </table>
</span>
<!-- part1 -->
</span>
<!-- spanNewResponseArea -->

<SharePoint:AttachmentUpload ID="AttachmentUpload1" runat="server" ControlMode="New" />
<SharePoint:ItemHiddenVersion ID="ItemHiddenVersion1" runat="server" ControlMode="New" />