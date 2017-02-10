<?php
namespace app\index\controller;
use think\Controller;
use think\Db;
class Index extends Controller
{   
    public function index()
    {
        $result = Db::table('think_data')->where('id','<',4)->limit(2)->order('id','esc')->select();
        dump(json_encode($result));
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
            $result = Db::table('user')->where('uname',$username)->select();
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
    public function items()
    {
        $result = Db::table('items')->select();
        return json_encode($result);
    }
}
