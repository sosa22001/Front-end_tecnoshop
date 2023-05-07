let empresa = {
    "nombre": "Apple",
    "descripcion": "Empresa estadounidense que diseña y fabrica dispositivos electrónicos y software",
    "imagen": "https://example.com/apple.png",
    "telefono": "+1 (408) 996-1010",
    "email": "info@apple.com",
    "categorias": {
        "categoria-1" : "id-categoria",
        "categoria-2" : "id-categoria"
    }
};

let producto = {
    "nombre" : "samsung Galaxy",
    "codigo" : "ABCDE",
    "descripcion" : "celular de gama alta con pantalla flex",
    "precio" : 1200,
    "empresa" : "id-empresa",
    "categoria" : "id-categoria"
};

let categoria = {
    "nombreCate" : "laptops",
    "id" : "1"
}

let usuario = {
    "nombre":"elmer",
    "apellido": "sosa",
    "email":"sosa66093@gmail.com",
    "contraseña" : "1234",
    "telefono" : "9501-1087"
}

let motorista = {
    "nombre":"elmer",
    "apellido": "sosa",
    "email":"sosa66093@gmail.com",
    "contraseña" : "1234",
    "telefono" : "9501-1087"
}

let pedidos = {
    "cliente" : "keneth",
    "direccion entrega" : "col. la sosa",
    "productos" : [
        {
          "nombre": "PlayStation 5",
          "cantidad": 1,
          "precio": 1000,
          "empresa" : "id-empresa"
        },
        {
          "nombre": "Control DualSense",
          "cantidad": 2,
          "precio": 1000,
          "empresa" : "id-empresa"
        }
      ],
      "subtotal" : 3000,
      "impuesto" : 200,
      "total" : 3200,
      "estado" : "en camino"
}
/**
 * Celulares:
Samsung
Apple
Xiaomi
Huawei

Laptops:
Dell
HP
Lenovo

Consolas:
PlayStation
Xbox

TV:
Samsung
LG

Tablets:
Apple
Samsung
Huawei

Relojes inteligentes:
Apple
Samsung
Huawei
 */