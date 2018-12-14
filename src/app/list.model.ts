export interface List {
    users: Array<String>;
    _id: String;
    owner:  {
        isAdmin: Boolean,
        _id: String,
        name: String,
        email: String
    };
    items: [
        {
            isDone: Boolean,
            storePosition: String,
            dateStarted: Date,
            dateModified: Date,
            _id: String,
            name: String
        }
    ];
}
