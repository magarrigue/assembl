define(function (require) {

    var AssemblPanel = require('views/assemblPanel'),
        CollectionManager = require('modules/collectionManager'),
        Types = require('utils/types'),
        Ctx = require('modules/context'),
        _ = require('underscore'),
        i18n = require('utils/i18n');

    var SynthesisInNavigationPanel = AssemblPanel.extend({
        template: '#tmpl-synthesisInNavigationPanel',
        panelType: 'synthesisNavPanel',
        className: 'synthesisNavPanel',

        ui: {
            synthesisList: ".synthesisList",
            synthesisListHeader: ".synthesisListHeader"
        },

        initialize: function (options) {
            this.groupContent = options.groupContent;
        },

        events: {
            'click .synthesisList > li': 'onSynthesisClick'
        },

        onRender: function () {
            var that = this,
                collectionManager = new CollectionManager();
            //console.log(this.groupContent.model);
            $.when(collectionManager.getAllMessageStructureCollectionPromise(), collectionManager.getAllSynthesisCollectionPromise()).done(
                function (allMessageStructureCollection, allSynthesisCollection) {
                    var synthesisMessages = allMessageStructureCollection.where({'@type': Types.SYNTHESIS_POST}),
                        html = '';
                    if (synthesisMessages.length > 0) {
                        _.sortBy(synthesisMessages, function (message) { return message.get('date'); });
                        synthesisMessages.reverse();
                        _.each(synthesisMessages, function (message) {
                            var synthesis = allSynthesisCollection.get(message.get('publishes_synthesis'));
                            html += "<li data-message-id=\"" + message.id + "\"><div class=\"title\">" + synthesis.get('subject') + "</div><div class=\"date\">" + Ctx.formatDate(message.get('date')) + "</div></li>";
                        });
                        that.ui.synthesisList.html(html);
                        that.displaySynthesis(synthesisMessages[0].id);
                    }
                    else {
                        that.ui.synthesisListHeader.html(i18n.gettext("No synthesis of the discussion has been published yet"));
                    }
                })

        },

        onSynthesisClick: function (ev) {
            var messageId = ev.currentTarget.attributes['data-message-id'].value;
            this.displaySynthesis(messageId);
        },
        displaySynthesis: function (messageId) {
            var collectionManager = new CollectionManager();
            messageListView = this.groupContent.getViewByTypeName('messageList');
            messageListView.currentQuery.clearAllFilters();
            messageListView.toggleFilterByPostId(messageId);
            messageListView.showMessageById(messageId, undefined, false);
            // Show that entry is selected
            this.selectSynthesisInMenu(messageId);
        },
        selectSynthesisInMenu: function(messageId){
            this.$("ul.synthesisList li").removeClass("selected");
            this.$("ul.synthesisList li[data-message-id=\""+messageId+"\"]").addClass("selected");
        }
    });


    return SynthesisInNavigationPanel;
});