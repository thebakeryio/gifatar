Template.images.created = function(){
    
    Session.set('captured-images',[]);

    this.imageCapturedSub = postal.subscribe({
        topic : 'image-captured',
        callback : _.bind(function(imageData){
        
            var currentImages = Session.get('captured-images');
            currentImages.push(imageData);
            Session.set('captured-images', currentImages);

            Deps.afterFlush(_.bind(function() {
                if(currentImages.length === ApplicationSettings.framesPerGif){
                    Animate.images(this.$('img.original'), function(gif){
                        postal.publish({
                            topic : 'show-preview',
                            data : gif
                        });
                    });
                }
            },this));

        },this)
    });
};

Template.images.destroyed = function(){
    if(typeof this.imageCapturedSub !== 'undefined'){
        this.imageCapturedSub.unsubscribe();
    }
};

Template.images.helpers({
    images : function(){
        return Session.get('captured-images');
    }
});