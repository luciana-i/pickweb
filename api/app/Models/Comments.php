<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class Comments extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function photos()
    {
        return $this->belongsTo('App\Photos');
    }
    protected $fillable = [
        'description', 'photo_id','user_id','date','dest_id_usr'
    ];
    public $timestamps = false;
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     *//*
    protected $hidden = [
        'password',
    ];
    */
}