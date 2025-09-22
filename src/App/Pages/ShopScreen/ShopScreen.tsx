import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    Dimensions,
    ScrollView,
} from 'react-native';

const primaryColor = '#ff6f00';
const screenWidth = Dimensions.get('window').width;

const categories = ['Tümü', 'Elektronik', 'Giyim', 'Ev Aletleri'];

// المنتجات مع وصف وصور إضافية
const products = [
    {
        "id": "1",
        "name": "iPhone 14 Akıllı Telefon",
        "category": "Elektronik",
        "price": "₺58.000",
        "images": [
            "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/refurb-iphone-14-pro-spaceblack-202404?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=YW1wQmFoQ3Nkd2xOYlpST2E3aVorMmVGRWdrQWJLaTRKK1NJMm03U3UybDZpbkxuT0dEdG9RU21oR001eCttN01zanZhYWFoVWJST3NYRWZpMk5hdmFobmZJSHUzWUlFZ083SGxhUktGT2RNSmQzZlgxemprZmErUm9FaXhjNys",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLOL4FR_ysoYxsvuJSQmZa9TjocCBa88Gevw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPknhbb8kWvNLc9RpFgFZRK1VJyLlhgaL44Q&s"
        ],
        "description": "Yüksek performanslı A15 çip, gelişmiş kamera sistemi ve uzun pil ömrü ile iPhone 14, teknoloji severler için ideal akıllı telefon."
    },
    {
        "id": "2",
        "name": "Erkek Tişörtü",
        "category": "Giyim",
        "price": "₺150",
        "images": [
            "https://www.ezcorporateclothing.com/cdn/shop/files/Gildan_8000_Red_Front_High.jpg?v=1708538341&width=1946",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4uchxsyYhbV7dqPry_VxK5YH3sK55rVIoAH5x71WeMwIYED-vXnP7izJrDvttVYfDwIE&usqp=CAU"
        ],
        "description": "Pamuklu, rahat kesim ve nefes alabilir kumaş ile yazlık erkek tişörtü."
    },
    {
        "id": "3",
        "name": "Akıllı Buzdolabı",
        "category": "Ev Aletleri",
        "price": "₺32.000",
        "images": [
            "https://target.scene7.com/is/image/Target/GUEST_94e6b7b7-b0ae-4c42-9600-c658b509e6f2?wid=300&hei=300&fmt=pjpeg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iZt3tPiXf_IF6T_W__-HQJcRfsV3OYzlLQ&s"
        ],
        "description": "Enerji tasarruflu, geniş iç hacmi ve akıllı soğutma teknolojisi ile modern buzdolabı."
    },
    {
        "id": "4",
        "name": "Dell Dizüstü Bilgisayar",
        "category": "Elektronik",
        "price": "₺67.000",
        "images": [
            "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/FL2C-A-BB-00?qlt=90&wid=1253&hei=705&extendN=0.12,0.12,0.12,0.12&bgc=FFFFFFFF&fmt=jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZqQJRLgY5_ld2Uzk6zH7yQ-9wJiQpMTSQbA&s"
        ],
        "description": "Güçlü işlemci, uzun pil ömrü ve hafif tasarımı ile Dell dizüstü bilgisayar."
    },
    {
        "id": "5",
        "name": "Kadın Elbisesi",
        "category": "Giyim",
        "price": "₺220",
        "images": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRPEaQgjTsH1J6HmbOtjO-w7eMgcrZquoBw&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz5xcVnTtgVw1T4do00LQLvWV4YDF12ZTsKE3ypC_2i-fiai1BSdXj3OWRrlPyNpz7s10&usqp=CAU"
        ],
        "description": "Şık tasarım ve rahat kesimiyle kadınlar için ideal elbise."
    },
    {
        "id": "6",
        "name": "Bluetooth Kulaklık",
        "category": "Elektronik",
        "price": "₺450",
        "images": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2S_h4ZBhUdlNIHDVl4DX_wHbhezep29d1mg&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9-ifB4yb_htSg_yK6AahthVxs7r34hZpGQ&s"
        ],
        "description": "Kablosuz, yüksek ses kalitesi ve uzun pil süresi ile Bluetooth kulaklık."
    },
    {
        "id": "7",
        "name": "Mikrodalga Fırın",
        "category": "Ev Aletleri",
        "price": "₺2.500",
        "images": [
            "https://cdn11.bigcommerce.com/s-8vy557m296/images/stencil/original/products/299/3171/30_SMO1754JS_3QR_WEB__88254.1694796065.JPG?c=2",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ipQYzBBlikp5ke3ldCL3AgvRe22izA0USQ&s"
        ],
        "description": "Hızlı ısıtma ve pratik kullanım özellikleriyle mikrodalga fırın."
    },
    {
        "id": "8",
        "name": "Spor Ayakkabı",
        "category": "Giyim",
        "price": "₺300",
        "images": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAV0SMs60nMmL82cshC31Szx47zY2orrZ_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJzkM37uG1jUWeIl3Qm5ec_bQQNhMwNuzvA&s"
        ],
        "description": "Konforlu ve dayanıklı spor ayakkabı, günlük kullanım için ideal."
    },
    {
        "id": "9",
        "name": "Akıllı Saat",
        "category": "Elektronik",
        "price": "₺1.200",
        "images": [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwq4qxV_u16ypF-0mID5LulrEjjoJE3LcUbA&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYFKmTlw2fcWmRH7P-qmM_px3Mk2LJWXIKxQ&s"
        ],
        "description": "Sağlık takibi, bildirim ve daha birçok özellik sunan akıllı saat."
    },
    {
        "id": "10",
        "name": "Kahve Makinesi",
        "category": "Ev Aletleri",
        "price": "₺1.000",
        "images": [
            "https://dummyimage.com/400x400/aaa/fff&text=Coffee+Machine-1",
            "https://dummyimage.com/400x400/bbb/fff&text=Coffee+Machine-2"
        ],
        "description": "Kahve yapmayı kolaylaştıran, şık tasarımlı kahve makinesi."
    },
    {
        "id": "11",
        "name": "Jean Pantolon",
        "category": "Giyim",
        "price": "₺180",
        "images": [
            "https://dummyimage.com/400x400/666/fff&text=Jeans-1",
            "https://dummyimage.com/400x400/777/fff&text=Jeans-2"
        ],
        "description": "Dayanıklı ve rahat jean pantolon, günlük kullanım için uygun."
    },
    {
        "id": "12",
        "name": "Tablet",
        "category": "Elektronik",
        "price": "₺3.500",
        "images": [
            "https://dummyimage.com/400x400/222/fff&text=Tablet-1",
            "https://dummyimage.com/400x400/333/fff&text=Tablet-2"
        ],
        "description": "Yüksek çözünürlüklü ekran ve güçlü işlemciye sahip tablet."
    },
    {
        "id": "13",
        "name": "Bulaşık Makinesi",
        "category": "Ev Aletleri",
        "price": "₺5.000",
        "images": [
            "https://dummyimage.com/400x400/333/fff&text=Dishwasher-1",
            "https://dummyimage.com/400x400/444/fff&text=Dishwasher-2"
        ],
        "description": "Enerji verimli ve sessiz çalışan bulaşık makinesi."
    },
    {
        "id": "14",
        "name": "Mont",
        "category": "Giyim",
        "price": "₺400",
        "images": [
            "https://dummyimage.com/400x400/555/fff&text=Jacket-1",
            "https://dummyimage.com/400x400/666/fff&text=Jacket-2"
        ],
        "description": "Soğuk havalar için sıcak tutan, şık mont."
    },
    {
        "id": "15",
        "name": "Kablosuz Fare",
        "category": "Elektronik",
        "price": "₺120",
        "images": [
            "https://dummyimage.com/400x400/111/fff&text=Mouse-1",
            "https://dummyimage.com/400x400/222/fff&text=Mouse-2"
        ],
        "description": "Ergonomik tasarım ve uzun pil ömrü ile kablosuz fare."
    },
    {
        "id": "16",
        "name": "Televizyon",
        "category": "Elektronik",
        "price": "₺9.000",
        "images": [
            "https://dummyimage.com/400x400/222/fff&text=TV-1",
            "https://dummyimage.com/400x400/333/fff&text=TV-2"
        ],
        "description": "Ultra HD çözünürlük ve geniş ekranlı televizyon."
    },
    {
        "id": "17",
        "name": "Ev Süpürgesi",
        "category": "Ev Aletleri",
        "price": "₺600",
        "images": [
            "https://dummyimage.com/400x400/444/fff&text=Vacuum-1",
            "https://dummyimage.com/400x400/555/fff&text=Vacuum-2"
        ],
        "description": "Güçlü emiş gücü ve hafif tasarımıyla ev süpürgesi."
    },
    {
        "id": "18",
        "name": "Spor Gömlek",
        "category": "Giyim",
        "price": "₺140",
        "images": [
            "https://dummyimage.com/400x400/777/fff&text=Shirt-1",
            "https://dummyimage.com/400x400/888/fff&text=Shirt-2"
        ],
        "description": "Rahat kesim ve modern tasarımlı spor gömlek."
    },
    {
        "id": "19",
        "name": "Oyuncu Kulaklığı",
        "category": "Elektronik",
        "price": "₺900",
        "images": [
            "https://dummyimage.com/400x400/999/fff&text=Gaming+Headset-1",
            "https://dummyimage.com/400x400/aaa/fff&text=Gaming+Headset-2"
        ],
        "description": "Yüksek ses kalitesi ve mikrofonlu oyuncu kulaklığı."
    }
];

const ShopScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [sliderIndex, setSliderIndex] = useState(0);

    const filteredProducts =
        selectedCategory === 'Tümü'
            ? products
            : products.filter(p => p.category === selectedCategory);

    const renderCategory = (cat: string) => (
        <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categorySelected,
            ]}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextSelected,
                ]}
            >
                {cat}
            </Text>
        </TouchableOpacity>
    );

    const openProductModal = (product: any) => {
        setSelectedProduct(product);
        setSliderIndex(0);
        setModalVisible(true);
    };

    const renderProduct = ({ item }: any) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => openProductModal(item)}
        >
            <Image source={{ uri: item.images[0] }} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>
                {item.name}
            </Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Sepete Ekle</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mağaza</Text>

            <View style={styles.categoriesContainer}>
                {categories.map(renderCategory)}
            </View>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.productsContainer}
            />

            {/* Modal وصف المنتج مع سلايدر صور */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {selectedProduct?.name}
                        </Text>
                        <Text style={styles.modalPrice}>
                            {selectedProduct?.price}
                        </Text>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={event => {
                                const index = Math.round(
                                    event.nativeEvent.contentOffset.x / screenWidth
                                );
                                setSliderIndex(index);
                            }}
                            scrollEventThrottle={16}
                        >
                            {selectedProduct?.images.map((img: string, idx: number) => (
                                <Image
                                    key={idx}
                                    source={{ uri: img }}
                                    style={styles.modalImage}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.dotsContainer}>
                            {selectedProduct?.images.map((_: any, idx: number) => (
                                <View
                                    key={idx}
                                    style={[
                                        styles.dot,
                                        idx === sliderIndex && styles.activeDot,
                                    ]}
                                />
                            ))}
                        </View>
                        <Text style={styles.modalDescription}>
                            {selectedProduct?.description}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingTop: 40,
        paddingHorizontal: 12,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: primaryColor,
        textAlign: 'center',
        marginBottom: 15,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 15,
    },
    categoryButton: {
        borderWidth: 1,
        borderColor: primaryColor,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        margin: 6,
        backgroundColor: '#fff',
    },
    categorySelected: {
        backgroundColor: primaryColor,
    },
    categoryText: {
        color: primaryColor,
        fontSize: 14,
    },
    categoryTextSelected: {
        color: '#fff',
        fontWeight: 'bold',
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    productsContainer: {
        paddingBottom: 50,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: (screenWidth - 36) / 2,
        padding: 12,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 15,
        color: primaryColor,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buyButton: {
        backgroundColor: primaryColor,
        borderRadius: 8,
        paddingVertical: 8,
        alignItems: 'center',
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: primaryColor,
    },
    modalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: primaryColor,
    },
    modalImage: {
        width: screenWidth - 80,
        height: 200,
        borderRadius: 12,
        marginRight: 10,
        resizeMode: 'cover',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: primaryColor,
    },
    modalDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
    },
    closeButton: {
        backgroundColor: primaryColor,
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ShopScreen;
