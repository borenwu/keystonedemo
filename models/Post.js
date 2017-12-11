var keystone = require('keystone');
var Types = keystone.Field.Types;

var storage = new keystone.Storage({
	adapter: require('keystone-storage-adapter-qiniu'),
	qiniu: {
		accessKey: 'rsnQ1mPiWJwthOmbSSIfwvsKkNX0ZzTrISaLMlM0',
		secretKey: 'Gu00U4X8-KUgHIAybg4TeeZnhjRX5d7-Dn8Jo89M',
		bucket: "ntboao",
		domain: "http://oy98650kl.bkt.clouddn.com/",
		region: 'Zone_z0', // optional; defaults to Zone_z0, or if that's not specified
		path: 'blogimage',
	}
});

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.File, storage: storage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
});

Post.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
