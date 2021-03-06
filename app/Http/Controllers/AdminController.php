<?php

namespace App\Http\Controllers;

use App\ProdukBaju;
use Request;
use Session;
use DB;
use DateTime;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.list_produk')->with([
            'sidebar' => 'home',
            'title'     => 'Manajemen Produk',
            ]);
    }
        public function getProdukView()
    {
        return view('admin.list_produk');
    }
    public function getProduk()
    {
        // dd(Request::all());
        // $dataProduk = ProdukBaju::all();
        // $dataOffsetLimit = ProdukBaju::skip(intval(Request::input('start')))->take(intval(Request::input('length')))
        // ->orderBy('created_at', 'desc')->get()->toArray();
        if (Request::input('search')['value'] == null) {
            $list = ProdukBaju::skip(intval(Request::input('start')))->take(intval(Request::input('length')))->orderBy('created_at', 'desc')->get()->toArray();
            $listData = ProdukBaju::orderBy('created_at', 'desc')->get()->toArray();
        } else {
            $list = ProdukBaju::where('name', 'like', '%' . Request::input('search')['value'] . '%')->skip(intval(Request::input('start')))->take(intval(Request::input('length')))->orderBy('created_at', 'desc')->get()->toArray();
        }

        // dd($list);
        if ($list != null) {
            $response = [
                "draw" => Request::input('draw'),
                "recordsTotal" => count($listData),
                "recordsFiltered" => count($listData),
                "data" => $list,
            ];
            // dd($response);
            return response()->json($response);
        } else {
            $response = [
                "draw" => Request::input('draw'),
                "recordsTotal" => count($list),
                "recordsFiltered" => count($list),
                "data" => $list,
            ];
            return $response;
        }
        // return response()->json($dataProduk);
    }
    public function addProdukView()
    {
        return view('admin.add_produk')->with([
            'sidebar' => 'add_produk',
            'title' => 'Tambah Produk',
        ]);
    }

    public function submitAddProduk()
    {
        $data = Request::all();
        $stok =  implode(',', $data['stokProduk']);
        $ukuran =  implode(',', $data['ukuran']);
        $warna =  implode(',', $data['warna']);
        $sql = new ProdukBaju();
        if (Request::has('imageProduk')) {
            $image = Request::file('imageProduk');
            $ext = $image->getClientOriginalExtension();
            $path = $image->storeAs('produk', 'produk_'.time().'.'.$ext, 'public');
            $sql->gambar = '/storage/'.$path;
        }
        $sql->brand_id = $data['brandId'];
        $sql->name = $data['namaProduk'];
        $sql->sku = $data['sku'];
        $sql->price = $data['hargaProduk'];
        $sql->description = $data['descProduk'];
        $sql->stok = $stok;
        $sql->warna = $warna;
        $sql->ukuran = $ukuran;
        $sql->is_displayed = 1;
        $sql->start_promo = new DateTime();
        $sql->end_promo = new DateTime();
        $sql->promo_price = '200000';
        $sql->gender = 'male/femal';
        $sql->material_upper = 'default';
        $sql->material_outer_sole = 'default';
        $sql->care_label = 'default';
        $sql->measurements = 'default';
        $sql->save();
        if ($sql->save()) {

            return redirect('/admin')->with('success', 'Berhasil Tambah Produk');
        } else {
            $messages = [
                'status' => 'success',
                'message' => 'Gagal Tambah Produk',
                'url' => 'close'
            ];

            return back()->with('notif', $messages);
        }
    }
    public function getEditProduk($id)
    {
        $id = base64_decode(urldecode($id));
        $data = ProdukBaju::where('id', $id)->first();
        $warna = explode (",", $data->warna); 
        $ukuran = explode (",", $data->ukuran); 
        $stok = explode (",", $data->stok); 
        // dd($data, $ukuran, $warna, $stok);
        $varian = [
            'stok'     => $stok,
            'warna'     => $warna,
            'ukuran'    => $ukuran
        ];
        return view('admin.edit_produk')->with([
            'produk'    => $data,
            'varian'    => $varian,
            'id'        => $id,
            'sidebar'   => 'edit_produk',
            'title'     => 'Update Produk',
        ]);
    }
    public function submitEditProduk()
    {
        $data = Request::all();
        // dd($data);
        $stok =  implode(',', $data['stokProduk']);
        $ukuran =  implode(',', $data['ukuran']);
        $warna =  implode(',', $data['warna']);
        // $sql = new ProdukBaju();
        $sql = ProdukBaju::find($data['id']);
        if (Request::has('imageProduk')) {
            $image = Request::file('imageProduk');
            $ext = $image->getClientOriginalExtension();
            $path = $image->storeAs('produk', 'produk_'.time().'.'.$ext, 'public');
            $sql->gambar = '/storage/'.$path;
        } else {
            $sql->gambar = '';
        }
        $sql->brand_id = $data['brandId'];
        $sql->name = $data['namaProduk'];
        $sql->sku = $data['sku'];
        $sql->price = $data['hargaProduk'];
        $sql->description = $data['descProduk'];
        $sql->stok = $stok;
        $sql->warna = $warna;
        $sql->ukuran = $ukuran;
        $sql->is_displayed = isset($data['is_displayed']) ;
        $sql->start_promo = isset($data['start_promo'])? $data['start_promo'] : new DateTime();
        $sql->end_promo = isset($data['end_promo'])? $data['end_promo'] : new DateTime();
        $sql->promo_price = isset($data['promo_price']);
        $sql->gender = isset($data['gender']);
        $sql->material_upper = isset($data['material_upper']);
        $sql->material_outer_sole = isset($data['material_outer_sole']);
        $sql->care_label = isset($data['care_label']);
        $sql->measurements = isset($data['measurements']);
        $sql->save();
        if ($sql->save()) {

            return redirect('/admin')->with('success', 'Berhasil Edit Produk');
        } else {
            $messages = [
                'status' => 'success',
                'message' => 'Gagal Tambah Produk',
                'url' => 'close'
            ];

            return back()->with('notif', $messages);
        }
    }
    public function deleteProduk($id)
    {
        $id = base64_decode(urldecode($id));
        $data = ProdukBaju::where('id', $id)->first()->delete();
        if ($data == true) {
            return redirect('/')->with('success', 'Berhasil Hapus Produk');
        } else {
            $messages = [
                'status' => 'error',
                'message' => 'Gagal Hapus Produk',
                'url' => 'close'
            ];
            return back()->with('notif', $messages);
        }
    }
}
