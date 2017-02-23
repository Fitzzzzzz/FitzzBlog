<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{   
    public function index()
    {
        $result = Db::execute('CREATE TABLE IF NOT EXISTS `blog_user`(
            `uid` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            `uname` char(20) NOT NULL,
            `upassword` char(16) NOT NULL
        );');
        var_dump($result);
        echo 'here is in the index method';
    }
    public function test($value='')
    {
        echo 'this is in the TEST';
    }
    public function login()
    {
        $username = $this->request->post('username');
        $upassword = $this->request->post('upassword');
        // var_dump($username);
        // var_dump($upassword);
        
        // $username = input('get.username');
        // $upassword = input('get.upassword');
        if(!empty($username) && !empty($upassword)){
            $result = Db::name('user')->where('uname',$username)->select();
            if(!empty($result)){
                // var_dump($result);
                if($result[0]['upassword']===$upassword){
                    $mresponse = ['code'=>'0000','msg'=>'success!'];    
                }
                else{$mresponse = ['code'=>'0011','msg'=>'password error!']; }
            }else{
                $mresponse = ['code'=>'1111','msg'=>'username error!'];
            }
        }else{
            $mresponse = ['code'=>'2222','msg'=>'input error!'];
        }
        return json_encode($mresponse);
    }
    public function getItems()
    {
        $result = Db::table('items')->select();
        return json_encode($result);
    }
    public function addArticle()
    {
        $create = Db::execute('CREATE TABLE IF NOT EXISTS `blog_article`(
            `art_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            `art_title` TEXT NOT NULL,
            `art_content` TEXT NOT NULL,
            `create_time` INT(11) NOT NULL
        );');
        
        // var_dump($insert);
        // exit;
        $title = $this->request->post('title');
        $content = $this->request->post('content');
        if(!empty($title) && !empty($content)){
            $time = time();
            $insert = Db::name('article')->insert(['art_title'=>$title,'art_content'=>$content,'create_time'=>$time]);
        }
    }
    public function getArticle()
    {
        $result = Db::name('article')->select();
        return json_encode($result);
    }
    public function getArticleTime()
    {
        $result = Db::query('SELECT `create_time` FROM `blog_article`;');
        return json_encode($result);
    }
}
