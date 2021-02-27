const fs = require('fs');
const root = './files/';

exports.saveFile = function(p_name, name, content)
{
    if(!fs.existsSync(root + p_name))
    {
        fs.mkdir(root + p_name, (err) => {
            if(err)
            {
                throw err;
            }
        });
    }
    fs.writeFileSync(root + p_name + '/' + name, content, 'utf-8');
}

exports.openFileWithDialog = function(w_title, w_root)
{
    
}