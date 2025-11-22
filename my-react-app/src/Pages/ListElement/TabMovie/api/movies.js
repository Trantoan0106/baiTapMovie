import { api } from "./client";

export const mapMovie = (x) => ({
id: x.maPhim,
title: x.tenPhim,
posterUrl: x.hinhAnh,
trailerUrl: x.trailer,
overview: x.moTa,
rating: x.danhGia,
group: x.maNhom,
releaseDate: x.ngayKhoiChieu,
isHot: !!x.hot,
isNowShowing: !!x.dangChieu,
isComingSoon: !!x.sapChieu,
})


export async function getMovies(params = {}){
const group = params.group || "GP01";

const {data} = await api.get("/QuanLyPhim/LayDanhSachPhim" , {params: {maNhom: group}});

const rawList = Array.isArray(data?.content) ? data.content : [];
let items = rawList.map(mapMovie);

if(params.query){
    const q = params.query.toLowerCase();
    items = items.filter((m) => m.title?.toLowerCase().includes(q));
}

if(typeof params.nowShowing === "boolean"){
    items = items.filter((m) => m.isNowShowing === params.nowShowing);
}

if(typeof params.comingSoon === "boolean"){
    items = items.filter((m) => m.isComingSoon === params.comingSoon);
}



if (typeof params.hot === "boolean") {
    items = items.filter((m) => m.isHot === params.hot);
  }


return {
    results: items,
    total: items.length,
    page: 1,
    pages: 1,
};
}


export async function getMovieById(id) {
  // API: /QuanLyPhim/LayThongTinPhim?MaPhim=1283
  const { data } = await api.get("/QuanLyPhim/LayThongTinPhim", {
    params: { MaPhim: id },
  });
  return mapMovie(data?.content || {});
}

export async function getShowtimesByMovieId(id) {
  const { data } = await api.get("/QuanLyRap/LayThongTinLichChieuPhim", {
    params: { MaPhim: id }, 
  });
  return data?.content || null;
}
