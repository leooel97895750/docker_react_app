from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # 建立 FastAPI 物件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 或者 ["http://localhost:3000"] 指定你的前端網址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GET API 1
@app.get("/")
def read_root():
    return {"message": "Hello World"}

# GET API 2 - 帶路徑參數
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "description": f"This is item {item_id}"}

# GET API 3 - 帶 Query 參數
@app.get("/search/")
def search_item(q: str = None):
    return {"query": q, "result": f"Result for {q}"}

# GET API 3 - 帶 Query 參數
@app.get("/test/")
def search_item(a: str = None, b: int = 0, c: bool = False):
    return {f"a: {a}, b: {b}, c: {c}"}  # 回傳查詢參數

# 取得fab列表
@app.get("/fab/")
def get_fab():
  return ["fab12", "fab14a", "fab14b", "fab15a", "fab15b", "fab20", "ebo20"]

# 取得product列表
@app.get("/product/")
def get_product():
  return ["SQL service", "TNS genserator", "MSA service"]

# 取得type列表
@app.get("/type/")
def get_type():
  return ["general", "inline1", "inline2", "critical"]
  
# 取得config_id
@app.get("/config_id/")
def get_config_id(product: str, type: str):
  return {"config_id": f"{product}_{type}_001"}

# 取得current_cluster_id
@app.get("/current_cluster_id/")
def get_cluster_id(config_id: str):
  return {"cluster_id": "cluster_002"}

# 取得cluster_id列表
@app.get("/cluster_id/")
def get_cluster_id():
  return ["cluster_001", "cluster_002", "cluster_003"]

# 取得product config table全部資料
@app.get("/product_config_table/")
def get_product_config_table(cluster_id: str):
  return {
    "success": True,
    "count": 10,
    "data": [
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 1, "name": "Casdrot", "type": "aable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 2, "name": "lweot", "type": "Vedetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 3, "name": "13rot", "type": "ccetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 4, "name": "fggrrot", "type": "hhegetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 5, "name": "sdarot", "type": "kkketable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 6, "name": "bbbrot", "type": "777etable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 7, "name": "asdfasrot", "type": "66getable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 8, "name": "adsfasdt", "type": "zzgetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 9, "name": "999rot", "type": "zzztable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"},
      { "id": 10, "name": "00000", "type": "zzzzetable", "asdfa": "asdfa", "bsdfa": "asdfa", "csdfa": "asdfa", "dsdfa": "asdfa", "esdfa": "asdfa", "fsdfa": "asdfa"}
    ]
  }
