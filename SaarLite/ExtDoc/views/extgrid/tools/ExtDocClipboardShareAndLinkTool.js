Ext.define('ExtDoc.views.extgrid.tools.ExtDocClipboardShareAndLinkTool', {
	requires:['ExtDoc.tools.controllers.ExtDocClipboardShareAndLinkController'],
	extend: 'ExtDoc.views.exttoolbar.ExtDocTool',
	anchor: 'clipboardShareAndLinkView',
	controller: 'clipboardShareAndLinkController',
	listeners: {
		click: 'shareAndLinkAction'
	},
	initTool: function(){
		this.setIcon('images/Icon_Share_And_Link.png');
		this.setTooltip(ExtDoc.locales.ExtDocLocaleManager.getText('share_and_link'));
	},
	updateTool: function(priority,record,selected){
		var mainGrid = ExtDoc.utils.ExtDocComponentManager.getComponent('main_grid');
		var currentFolderRecord = mainGrid.getCurrentLocation();
		var objectType = currentFolderRecord.data['r_object_type'];
		var isRegularFolder = false;
		
		try
		{
			isRegularFolder = currentFolderRecord.data['r_object_id'].substring(0,2) == '0b';
		}
		catch (error)
		{
			isRegularFolder = false;
		}
			
		if (mainGrid.getSelection().length > 0 && objectType == 'clipboard' && isRegularFolder)
		{
			if (this.isHidden())
			{
				this.setHidden(false);
			}
			if (this.isDisabled())
			{
				this.setDisabled(false);
			}
		}
		else
		{
			if (!this.isHidden())
			{
				this.setHidden(true);
			}
			if (!this.isDisabled())
			{
				this.setDisabled(true);
			}
		}
		
		if (ExtDoc.utils.ExtDocLimitedAccess.checkLimitedAccess())
		{
			if (!this.isHidden())
			{
				this.setHidden(true);
			}
			if (!this.isDisabled())
			{
				this.setDisabled(true);
			}
		}
		
	    this.callParent(arguments);
	}
});