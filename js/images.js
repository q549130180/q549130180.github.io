/** 图片参数配置 */
var images = {};

images.basePath = "images";

//风景
images.scenery = [];

images.scenery.push({"name":"001","path":"/scenery/scenery-001.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"002","path":"/scenery/scenery-002.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"003","path":"/scenery/scenery-003.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"004","path":"/scenery/scenery-004.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"005","path":"/scenery/scenery-005.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"006","path":"/scenery/scenery-006.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"007","path":"/scenery/scenery-007.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"008","path":"/scenery/scenery-008.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"009","path":"/scenery/scenery-009.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"010","path":"/scenery/scenery-010.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"011","path":"/scenery/scenery-011.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"012","path":"/scenery/scenery-012.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"013","path":"/scenery/scenery-013.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});
images.scenery.push({"name":"014","path":"/scenery/scenery-014.jpg","type":"jpg","TermType":"pc","isActive":"Y","description":""});



//默认
images.default = [];
for(var a in images){
    var clas = Object.prototype.toString.call(images[a]).slice(8, -1);
    if(images[a] !== undefined && images[a] !== null && clas ==='Array'){
        images.default = images.default.concat(images[a]);
    }
}
