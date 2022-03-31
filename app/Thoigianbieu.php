<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Thoigianbieu extends Model
{
    protected $table = 'lichhen';
    protected $fillable = ['idkhachhang', 'dichvu', 'trangthai', 'ghichu', 'loai', 'dieutri', 'benhly', 'idkhammoi','start', 'end', 'giohen', 'gioketthuc', 'idbacsi'];
    public function chinhanhs()
	{
		return $this->belongsTo('App\Chinhanh','chinhanh');
	}public function dieutritheolich()
	{
		return $this->belongsTo('App\Dieutritheolich','id','idlich');
	}
    public function bolocchuoicantim($query, $value)
    {
     return $query->with('khachhangs')
     ->with('bacsis')
     ->with('dichvus')
     ->with('dieutris')
     ->with('benhlys')
     ->with('khammois')->whereHas('khachhangs', function($query) use ($value) {
        $query->Where("hoten", 'LIKE',"%".$value."%");
     })->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function boloctenbacsi($query, $value)
    {
     return $query->with('khachhangs')
     ->with('bacsis')
     ->with('dichvus')
     ->with('dieutris')
     ->with('benhlys')
     ->with('khammois')->whereHas('bacsis', function($query) use ($value) {
        $query->Where("ten", 'LIKE',"%".$value."%");
     })->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function bolocngaytao($query, $value)
    {
        $date=date_create($value);
    return $query->with('khachhangs')
    ->with('bacsis')
    ->with('dichvus')
    ->with('dieutris')
    ->with('benhlys')
    ->with('khammois')->where('created_at','LIKE',date_format($date,"Y-m-d")." %")->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function bolockhoangngaytao($query, $value)
    {
        $arr=array ();  
        $datestr = str_replace('/', '-',  $value );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
        return $query->with('khachhangs')
        ->with('bacsis')
        ->with('dichvus')
        ->with('dieutris')
        ->with('benhlys')
        ->with('khammois')->where('created_at', '>', $date1)->where('created_at', '<', $date2);
    }
    public function bolocthoigianhen($query, $value)
    {
      
  
    return $query->with('khachhangs')
    ->with('bacsis')
    ->with('dichvus')
    ->with('dieutris')
    ->with('benhlys')
    ->with('khammois')->where('start','LIKE',$value."%")->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function bolockhoangngayhen($query, $value)
    {
        $arr=array ();  
        $datestr = str_replace('/', '-',  $value );
        $myArray = explode(' ', $datestr);
        $date1=$myArray[0];
        $date2=$myArray[2];
        $date1=date("Y-m-d", strtotime($date1));  
        $date2=date("Y-m-d", strtotime($date2));  
        return $query->with('khachhangs')
        ->with('bacsis')
        ->with('dichvus')
        ->with('dieutris')
        ->with('benhlys')
        ->with('khammois')->where('start', '>', $date1)->where('start', '<', $date2)->orderBy('start', 'desc')->orderBy('giohen', 'desc');
    }
    public function scopeBoloc($query, $param)
    {
        foreach ($param as $field => $value) {
            $method = 'boloc' . $field;

            if ($value != '') {
                if (method_exists($this, $method)) {
                    $this->{$method}($query, $value);
                } else {
                    if (!empty($this->bolocable) && is_array($this->bolocable)) {
                        if (in_array($field, $this->filterable)) {
                            $query->with('khachhangs')
                            ->with('bacsis')
                            ->with('dichvus')
                            ->with('dieutris')
                            ->with('benhlys')
                            ->with('khammois')
                           ->where($this->table . '.' . $field, $value)->orderBy('start', 'desc')->orderBy('giohen', 'desc');
                        } elseif (key_exists($field, $this->bolocable)) {
                            $query->with('khachhangs')
                            ->with('bacsis')
                            ->with('dichvus')
                            ->with('dieutris')
                            ->with('benhlys')
                            ->with('khammois')
                           ->where($this->table . '.' . $field, $value)->orderBy('start', 'desc')->orderBy('giohen', 'desc');
                        }
                    }
                }
            }
        }
    
        return $query;
    }
    public function bacsis()
	{
		return $this->belongsTo('App\Doctor', 'idbacsi','id');
	}
    public function dichvus()
	{
		return $this->belongsTo('App\Dichvu', 'dichvu','id');
	}
    public function dieutris()
	{
		return $this->belongsTo('App\Sanphamdichvu', 'dieutri','id');
	}
    public function benhlys()
	{
		return $this->belongsTo('App\Chandoancacloai', 'benhly','id');
	}
    public function khammois()
	{
		return $this->belongsTo('App\Khammoi', 'idkhammoi','id');
	}
    public function khachhangs()
	{
		return $this->belongsTo('App\Khachhang','idkhachhang','ID');
	}
}
