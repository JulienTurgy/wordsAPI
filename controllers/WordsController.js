const Repository = require('../models/Repository');
const CollectionFilter = require('../models/collectionFilter');

module.exports = 
class ContactsController extends require('./Controller') {
    constructor(req, res){
        super(req, res);
        this.wordsRepository = new Repository('Words');
    }
    // GET: api/words
    get(){
        let params = this.getQueryStringParams(); 
        if(params == null){
            this.response.JSON(this.wordsRepository.getAll());
        }
        else {
            let offset = parseInt(params["offset"]);
            let limit = parseInt(params["limit"]);
            if(isNaN(offset) || isNaN(limit)){
                this.response.unprocessable();
            }
            else {
                let collectionFilter = new CollectionFilter(this.wordsRepository.getAll(), params);
                this.response.JSON(collectionFilter.get());
            }
        }
    }
}