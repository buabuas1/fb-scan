export class GroupFeedModel implements IBDSModel {
    public url: string;
    public content: string;
    public postTime: Date;
    public bdsType: string;
    public costs: any;
    public costsView: string;
    public postTimeView: Date;
    public contentTypes: any[];
    public numberCosts: any[];
    public fbType: string;
    public id: string;
    constructor(feed: any) {
        try {
            this.url = feed.node.comet_sections.context_layout.story.comet_sections.timestamp.story.url;
            this.content = feed.node.comet_sections.content.story.comet_sections.message.story.message.text;
            this.postTime = new Date(feed.node.comet_sections
                .context_layout.story.comet_sections.timestamp.story.creation_time * 1000);
            this.id = feed.node.comet_sections.feedback.story.feedback_context.feedback_target_with_context
                .subscription_target_id;
        } catch (e) {
            console.log('Lỗi tại ', feed);
            console.log('Link ', this.url);
            console.log('Lỗi ', e);
        }
    }

}
