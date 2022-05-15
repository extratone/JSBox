let env = 'production';
let token = 'f65019e2c73a0d0307e69606ece3413cb5fbf40812def4ca4120b1ad11a22bbe';
if (window.location.href.startsWith('file:')) {
    env = 'development';
    token = '3ccf5242c03a83287a408796cbd0d15996c59d7015d246b9135b00c3419219c9';
}
CKCatalog.init = function () {
    try {
        // Configure CloudKit for your app.
        CloudKit.configure({
            containers: [{
                // Change this to a container identifier you own.
                containerIdentifier: 'iCloud.com.agiletortoise.Drafts5',
                apiTokenAuth: {
                    // And generate a web token through CloudKit Dashboard.
                    apiToken: token,
                    persist: true // Sets a cookie.
                },
                environment: env
            }]
        });
    } catch (e) {
        alert(e);
    }
};

