         b   a      ���������F���(/�z�N^�4,            u#[test]
fn issue1108() {
    let data = "impl<x<>>::x for";
    let _ = syn::parse_file(data);
}
