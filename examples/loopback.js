/**
 * Loopback filesystem
 **/
var FileSystem = require('../fuse').FileSystem;
var PosixError = require('../fuse').PosixError;

var util = require('util');

var Loopback = function(options) {
    //this.fuse = fuse;
    this.options = options;

    console.log(options);
    FileSystem.call(this);
};

util.inherits(Loopback, FileSystem);

var fsData= { inodes: {}, last_inode: 1 };


(function() {
    this.init = function(connInfo) {
        console.log(connInfo);
        console.log('Initializing Loopback filesystem!!');
        console.log(this.options);
    };

    this.destroy = function() {
        console.log('Cleaning up filesystem...');
    };

    this.lookup = function(context, parent, name, reply) {
        console.log('Lookup!');
        console.log(parent);
        console.log(context);
        console.log(name);

	if(name == '._.') {
            var entry = {
		inode: parent,
		generation: 0,
		attr: {
                    // dev: 234881026,
                    inode: parent,
                    mode: 16877,
                    nlink: 2,
                    uid: 501,
                    gid: 20,
                    rdev: 0,
                    size: 0,
                    blksize: 512,
                    blocks: 1,
                    atime: 1331780451475, //Date.now();
                    mtime: 1331780451475, //Date.now();
                    ctime: 1331780451475, //Date.now();
		},
		attr_timeout: 30, //in seconds
		entry_timeout: 60 //in seconds
            };
            reply.entry(entry);
	} else {
	    reply.err(PosixError.ENOENT);
	}
    };

    this.forget = function(context, inode, nlookup) {
        console.log('Forget was called!!');
    };

    this.getattr = function(context, inode, reply) {
        console.log('Getattr was called!!');
        console.log(context);
        console.log(inode);

        var hello = "Hello World!\n";
        //stat object
        var attrs = {
            // dev: 0,
            inode: inode,
            mode: 16877,
            nlink: 2,
            uid: 501,
            gid: 20,
            rdev: 0,
            size: 0,
            blksize: 512,
            blocks: 1,
            atime: 1331780451475, //Date.now();
            mtime: 1331780451475, //Date.now();
            ctime: 1331780451475 //Date.now();
        };
        reply.attr(attrs, 1000);
        //reply.err(PosixError.EIO);
    };

    this.setattr = function(context, inode, attrs, reply) {
        console.log('Setattr was called!!');
        console.log(attrs);

        //reply.attr(attrs, 1000);
        reply.err(PosixError.EIO);
    };

    this.readlink = function(context, inode, reply) {
        console.log('Readlink was called!');
        //reply.readlink('eso');
        reply.err(PosixError.EIO);
    };

    this.mknod = function(context, parent, name, mode, rdev, reply) {
        console.log('Mknod was called!');
	console.log(parent);
	console.log(name);
	console.log(mode);
	console.log(rdev);

        var entry = {
	    inode: ++fsData.last_inode,
	    generation: 0,
	    attr: {
		// it should be ino but needs to be inode
		inode: fsData.last_inode,
		mode: mode,
		nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                size: 0,
                blksize: 512,
                blocks: 1,
                atime: Date.now(),
                mtime: Date.now(),
                ctime: Date.now()
	    },
	    attr_timeout: 30, //in seconds
	    entry_timeout: 60 //in seconds
        };

	fsData[fsData.last_inode]= { parent: parent, name: name, mode: mode, rdev: rdev };

        reply.entry(entry, 1000);
        // reply.err(PosixError.ENOENT);
    };

    this.mkdir = function(context, parent, name, mode, reply) {
        console.log('Mkdir was called!');
        reply.err(PosixError.EIO);
        //reply.entry(entry);
    };

    this.unlink = function(context, parent, name, reply) {
        console.log('Unlink was called!');
        reply.err(PosixError.EIO);
    };

    this.rmdir = function(context, parent, name, reply) {
        console.log('Rmdir was called!');
        reply.err(0);
    };

    this.symlink = function(context, parent, link, name, reply) {
        console.log('Symlink was called!');
        reply.err(0);
        //reply.entry(entry);
    };

    this.rename = function(context, parent, name, newParent, newName, reply) {
        console.log('Rename was called!');
        reply.err(0);
        //reply.err(PosixError.EIO);
    };

    this.link = function(context, inode, newParent, newName, reply) {
        console.log('Link was called!');
        reply.err(PosixError.EIO);
        //reply.entry(entry);
    };

    this.open = function(context, inode, fileInfo, reply) {
        console.log('Open was called!');
        reply.err(0);
        //reply.open();
    };

    this.read = function() {

    };

    this.write = function() {
	console.log('Write was called??');
    };

    this.flush = function() {

    };

    this.release = function() {

    };

    this.fsync = function() {

    };

    this.opendir = function() {

    };

    this.readdir = function() {

    };

    this.releasedir = function() {

    };

    this.fsyncdir = function() {

    };

    this.statfs = function() {

    };

    this.setxattr = function() {

    };

    this.getxattr = function() {

    };

    this.listxattr = function() {

    };

    this.removexattr = function() {

    };

    this.access = function() {

    };

    this.create = function() {

    };

    this.getlk = function() {

    };

    this.setlk = function() {

    };

    this.bmap = function() {

    };

    this.ioctl = function() {

    };

    this.poll = function() {

    };
}).call(Loopback.prototype);

module.exports = Loopback;
