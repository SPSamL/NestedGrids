﻿<%@ Assembly Name="$SharePoint.Project.AssemblyFullName$" %>
<%@ Import Namespace="Microsoft.SharePoint.ApplicationPages" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="asp" Namespace="System.Web.UI" Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Import Namespace="Microsoft.SharePoint" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewItemForm.aspx.cs" Inherits="Larko.SharePoint.NestedGrids.NewItemForm" MasterPageFile="~masterurl/default.master" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
	<SharePoint:ListFormPageTitle ID="ListFormPageTitle1" runat="server" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
	<span class="die">
		<SharePoint:ListProperty Property="LinkTitle" runat="server" ID="ID_LinkTitle" />
		: </span>
	<SharePoint:ListItemProperty ID="ID_ItemProperty" MaxLength="40" runat="server" />
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="PlaceHolderPageImage" runat="server">
	<img src="/_layouts/images/blank.gif" width='1' height='1' alt="" />
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="PlaceHolderLeftNavBar" runat="server">
	<SharePoint:UIVersionedContent ID="UIVersionedContent1" UIVersion="4" runat="server">
		<contenttemplate>
				<div class="ms-quicklaunchouter">
				<div class="ms-quickLaunch">
				<Sharepoint:UIVersionedContent ID="UIVersionedContent2" runat="server" UIVersion="4">
					<ContentTemplate>
						<h2 style="display:inline;" class="ms-hidden"><SharePoint:EncodedLiteral ID="EncodedLiteral1" runat="server" text="<%$Resources:wss,quiklnch_pagetitle%>" EncodeMethod="HtmlEncode"/></h2>
					</ContentTemplate>
				</SharePoint:UIVersionedContent>
				<SharePoint:UIVersionedContent ID="UIVersionedContent3" UIVersion="3" runat="server">
					<ContentTemplate>
						<h3 class="ms-standardheader"><label class="ms-hidden"><SharePoint:EncodedLiteral ID="EncodedLiteral2" runat="server" text="<%$Resources:wss,quiklnch_pagetitle%>" EncodeMethod="HtmlEncode"/></label>
						<Sharepoint:SPSecurityTrimmedControl ID="SPSecurityTrimmedControl1" runat="server" PermissionsString="ViewFormPages">
							<div class="ms-quicklaunchheader"><SharePoint:SPLinkButton id="idNavLinkViewAll" runat="server" NavigateUrl="~site/_layouts/viewlsts.aspx" Text="<%$Resources:wss,quiklnch_allcontent%>" accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>"/></div>
						</SharePoint:SPSecurityTrimmedControl>
						</h3>
					</ContentTemplate>
				</SharePoint:UIVersionedContent>
				<Sharepoint:SPNavigationManager
				id="QuickLaunchNavigationManager"
				runat="server"
				QuickLaunchControlId="QuickLaunchMenu"
				ContainedControl="QuickLaunch"
				EnableViewState="false"
				CssClass="ms-quicklaunch-navmgr"
				>
				<div>
					<SharePoint:DelegateControl ID="DelegateControl1" runat="server"
						ControlId="QuickLaunchDataSource">
					 <Template_Controls>
						<asp:SiteMapDataSource
						SiteMapProvider="SPNavigationProvider"
						ShowStartingNode="False"
						id="QuickLaunchSiteMap"
						StartingNodeUrl="sid:1025"
						runat="server"
						/>
					 </Template_Controls>
					</SharePoint:DelegateControl>
			<SharePoint:UIVersionedContent ID="UIVersionedContent4" UIVersion="3" runat="server">
				<ContentTemplate>
					<SharePoint:AspMenu
						id="QuickLaunchMenu"
						runat="server"
						DataSourceId="QuickLaunchSiteMap"
						Orientation="Vertical"
						StaticDisplayLevels="2"
						ItemWrap="true"
						MaximumDynamicDisplayLevels="0"
						StaticSubMenuIndent="0"
						SkipLinkText=""
						CssClass="s4-die"
						>
						<LevelMenuItemStyles>
							<asp:MenuItemStyle CssClass="ms-navheader"/>
							<asp:MenuItemStyle CssClass="ms-navitem"/>
						</LevelMenuItemStyles>
						<LevelSubMenuStyles>
							<asp:SubMenuStyle CssClass="ms-navSubMenu1"/>
							<asp:SubMenuStyle CssClass="ms-navSubMenu2"/>
						</LevelSubMenuStyles>
						<LevelSelectedStyles>
							<asp:MenuItemStyle CssClass="ms-selectednavheader"/>
							<asp:MenuItemStyle CssClass="ms-selectednav"/>
						</LevelSelectedStyles>
					</SharePoint:AspMenu>
				</ContentTemplate>
			</SharePoint:UIVersionedContent>
			<SharePoint:UIVersionedContent ID="UIVersionedContent5" UIVersion="4" runat="server">
				<ContentTemplate>
					<SharePoint:AspMenu
					  id="V4QuickLaunchMenu"
					  runat="server"
					  EnableViewState="false"
					  DataSourceId="QuickLaunchSiteMap"
					  UseSimpleRendering="true"
					  Orientation="Vertical"
					  StaticDisplayLevels="2"
					  MaximumDynamicDisplayLevels="0"
					  SkipLinkText=""
					  CssClass="s4-ql" />
				</ContentTemplate>
			</SharePoint:UIVersionedContent>
				</div>
				</Sharepoint:SPNavigationManager>
			<Sharepoint:UIVersionedContent ID="UIVersionedContent6" runat="server" UIVersion="3">
				<ContentTemplate>
					<Sharepoint:SPNavigationManager
					id="TreeViewNavigationManager"
					runat="server"
					ContainedControl="TreeView"
					>
					  <table class="ms-navSubMenu1" cellpadding="0" cellspacing="0" border="0">
						<tr>
						  <td>
							<table class="ms-navheader" width="100%" cellpadding="0" cellspacing="0" border="0">
							  <tr>
								<td nowrap="nowrap" id="idSiteHierarchy">
								  <SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/viewlsts.aspx" id="idNavLinkSiteHierarchy" Text="<%$Resources:wss,treeview_header%>" accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>"/>
								</td>
							  </tr>
							</table>
						  </td>
						</tr>
					  </table>
					  <div class="ms-treeviewouter">
						<SharePoint:DelegateControl ID="DelegateControl2" runat="server" ControlId="TreeViewAndDataSource">
						  <Template_Controls>
							<SharePoint:SPHierarchyDataSourceControl
							 runat="server"
							 id="TreeViewDataSource"
							 RootContextObject="Web"
							 IncludeDiscussionFolders="true"
							/>
							<SharePoint:SPRememberScroll runat="server" id="TreeViewRememberScroll" onscroll="javascript:_spRecordScrollPositions(this);" style="overflow: auto;height: 400px;width: 150px; ">
							  <Sharepoint:SPTreeView
								id="WebTreeView"
								runat="server"
								ShowLines="false"
								DataSourceId="TreeViewDataSource"
								ExpandDepth="0"
								SelectedNodeStyle-CssClass="ms-tvselected"
								NodeStyle-CssClass="ms-navitem"
								NodeStyle-HorizontalPadding="2"
								SkipLinkText=""
								NodeIndent="12"
								ExpandImageUrl="/_layouts/images/tvplus.gif"
								CollapseImageUrl="/_layouts/images/tvminus.gif"
								NoExpandImageUrl="/_layouts/images/tvblank.gif"
							  >
							  </Sharepoint:SPTreeView>
							</Sharepoint:SPRememberScroll>
						  </Template_Controls>
						</SharePoint:DelegateControl>
					  </div>
					</Sharepoint:SPNavigationManager>
				</ContentTemplate>
			</SharePoint:UIVersionedContent>
			<Sharepoint:UIVersionedContent ID="UIVersionedContent7" runat="server" UIVersion="4">
				<ContentTemplate>
					<Sharepoint:SPNavigationManager
					id="TreeViewNavigationManagerV4"
					runat="server"
					ContainedControl="TreeView"
					CssClass="s4-treeView"
					>
					  <SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/viewlsts.aspx" id="idNavLinkSiteHierarchyV4" Text="<%$Resources:wss,treeview_header%>" accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>" CssClass="s4-qlheader" />
						  <div class="ms-treeviewouter">
							<SharePoint:DelegateControl ID="DelegateControl3" runat="server" ControlId="TreeViewAndDataSource">
							  <Template_Controls>
								<SharePoint:SPHierarchyDataSourceControl
								 runat="server"
								 id="TreeViewDataSourceV4"
								 RootContextObject="Web"
								 IncludeDiscussionFolders="true"
								/>
								<SharePoint:SPRememberScroll runat="server" id="TreeViewRememberScrollV4" onscroll="javascript:_spRecordScrollPositions(this);" style="overflow: auto;height: 400px;width: 155px; ">
								  <Sharepoint:SPTreeView
									id="WebTreeViewV4"
									runat="server"
									ShowLines="false"
									DataSourceId="TreeViewDataSourceV4"
									ExpandDepth="0"
									SelectedNodeStyle-CssClass="ms-tvselected"
									NodeStyle-CssClass="ms-navitem"
									SkipLinkText=""
									NodeIndent="12"
									ExpandImageUrl="/_layouts/images/tvclosed.png"
									ExpandImageUrlRtl="/_layouts/images/tvclosedrtl.png"
									CollapseImageUrl="/_layouts/images/tvopen.png"
									CollapseImageUrlRtl="/_layouts/images/tvopenrtl.png"
									NoExpandImageUrl="/_layouts/images/tvblank.gif"
								  >
								  </Sharepoint:SPTreeView>
								</Sharepoint:SPRememberScroll>
							  </Template_Controls>
							</SharePoint:DelegateControl>
						  </div>
					</Sharepoint:SPNavigationManager>
				</ContentTemplate>
			</SharePoint:UIVersionedContent>
				<SharePoint:UIVersionedContent UIVersion="3" runat="server" id="PlaceHolderQuickLaunchBottomV3">
					<ContentTemplate>
						<table width="100%" cellpadding="0" cellspacing="0" border="0" class="s4-die">
						<tbody>
						<tr><td>
						<table class="ms-recyclebin" width="100%" cellpadding="0" cellspacing="0" border="0">
						<tbody>
						<tr><td nowrap="nowrap">
						<SharePoint:SPLinkButton runat="server" NavigateUrl="~site/_layouts/recyclebin.aspx" id="v3idNavLinkRecycleBin" ImageUrl="/_layouts/images/recycbin.gif" Text="<%$Resources:wss,StsDefault_RecycleBin%>" PermissionsString="DeleteListItems" />
						</td></tr>
						</table>
						</td></tr>
						</table>
					</ContentTemplate>
				</SharePoint:UIVersionedContent>
				<SharePoint:UIVersionedContent UIVersion="4" runat="server" id="PlaceHolderQuickLaunchBottomV4">
					<ContentTemplate>
						<ul class="s4-specialNavLinkList">
							<li>
								<SharePoint:ClusteredSPLinkButton
									runat="server"
									NavigateUrl="~site/_layouts/recyclebin.aspx"
									ImageClass="s4-specialNavIcon"
									ImageUrl="/_layouts/images/fgimg.png"
									ImageWidth=16
									ImageHeight=16
									OffsetX=0
									OffsetY=428
									id="idNavLinkRecycleBin"
									Text="<%$Resources:wss,StsDefault_RecycleBin%>"
									CssClass="s4-rcycl"
									PermissionsString="DeleteListItems" />
							</li>
							<li>
								<SharePoint:ClusteredSPLinkButton
									id="idNavLinkViewAllV4"
									runat="server"
									PermissionsString="ViewFormPages"
									NavigateUrl="~site/_layouts/viewlsts.aspx"
									ImageClass="s4-specialNavIcon"
									ImageUrl="/_layouts/images/fgimg.png"
									ImageWidth=16
									ImageHeight=16
									OffsetX=0
									OffsetY=0
									Text="<%$Resources:wss,quiklnch_allcontent_short%>"
									accesskey="<%$Resources:wss,quiklnch_allcontent_AK%>"/>
							</li>
						</ul>
					</ContentTemplate>
				</SharePoint:UIVersionedContent>
				</div>
				</div>
	</contenttemplate>
	</SharePoint:UIVersionedContent>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolderMain" runat="server">
	<SharePoint:UIVersionedContent ID="UIVersionedContent8" UIVersion="4" runat="server">
		<contenttemplate>
	<div style="padding-left:5px">
	</contenttemplate>
	</SharePoint:UIVersionedContent>
	<table cellpadding="0" cellspacing="0" id="onetIDListForm" style="width: 100%">
		<tr>
			<td>
				<%-- This is necessary even if UseLegacyForm=TRUE for some reason? --%>
				<WebPartPages:WebPartZone runat="server" FrameType="None" ID="Main" Title="loc:Main" Visible="true">
					<ZoneTemplate></ZoneTemplate>
				</WebPartPages:WebPartZone>

				<table border="0" width="100%">
					<tr>
						<td class="ms-toolbar" nowrap="nowrap">
							<SharePoint:FormToolBar ID="FormToolBar1" runat="server" ControlMode="Display" />
						</td>
					</tr>
					<tr>
						<td>

							<asp:PlaceHolder ID="NewItemControlPlaceHolder" runat="server"></asp:PlaceHolder>
						</td>
					</tr>
				</table>
				<img src="/_layouts/images/blank.gif" width='590' height='1' alt="" />
			</td>
		</tr>
	</table>
	<SharePoint:UIVersionedContent ID="UIVersionedContent9" UIVersion="4" runat="server">
		<contenttemplate>
	</div>
	</contenttemplate>
	</SharePoint:UIVersionedContent>
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePoint:UIVersionedContent ID="UIVersionedContent10" UIVersion="4" runat="server">
		<contenttemplate>
		<SharePoint:CssRegistration Name="forms.css" runat="server"/>
	</contenttemplate>
	</SharePoint:UIVersionedContent>
</asp:Content>
<asp:Content ID="Content7" ContentPlaceHolderID="PlaceHolderTitleLeftBorder" runat="server">
	<table cellpadding="0" height="100%" width="100%" cellspacing="0">
		<tr>
			<td class="ms-areaseparatorleft">
				<img src="/_layouts/images/blank.gif" width='1' height='1' alt="" /></td>
		</tr>
	</table>
</asp:Content>
<asp:Content ID="Content8" ContentPlaceHolderID="PlaceHolderTitleAreaClass" runat="server">
	<script type="text/javascript" id="onetidPageTitleAreaFrameScript">
		if (document.getElementById("onetidPageTitleAreaFrame") != null) {
			document.getElementById("onetidPageTitleAreaFrame").className = "ms-areaseparator";
		}
	</script>
</asp:Content>
<asp:Content ID="Content9" ContentPlaceHolderID="PlaceHolderBodyAreaClass" runat="server">
	<style type="text/css">
		.ms-bodyareaframe {
			padding: 8px;
			border: none;
	</style>
</asp:Content>
<asp:Content ID="Content10" ContentPlaceHolderID="PlaceHolderBodyLeftBorder" runat="server">
	<div class='ms-areaseparatorleft'>
		<img src="/_layouts/images/blank.gif" width='8' height='100%' alt="" />
	</div>
</asp:Content>
<asp:Content ID="Content11" ContentPlaceHolderID="PlaceHolderTitleRightMargin" runat="server">
	<div class='ms-areaseparatorright'>
		<img src="/_layouts/images/blank.gif" width='8' height='100%' alt="" />
	</div>
</asp:Content>
<asp:Content ID="Content12" ContentPlaceHolderID="PlaceHolderBodyRightMargin" runat="server">
	<div class='ms-areaseparatorright'>
		<img src="/_layouts/images/blank.gif" width='8' height='100%' alt="" />
	</div>
</asp:Content>
<asp:Content ID="Content13" ContentPlaceHolderID="PlaceHolderTitleAreaSeparator" runat="server" />