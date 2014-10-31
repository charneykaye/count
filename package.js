var profile = {
    resourceTags: {
        ignore: function(filename, mid){
            // only include nickckaye/count
            return mid != "nickckaye/count";
        },
        amd: function(filename, mid){
            return /\.js$/.test(filename);
        }
    }
};
