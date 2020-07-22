var profile = {
    resourceTags: {
        ignore: function(filename, mid){
            // only include charneykaye/count
            return mid != "charneykaye/count";
        },
        amd: function(filename, mid){
            return /\.js$/.test(filename);
        }
    }
};
