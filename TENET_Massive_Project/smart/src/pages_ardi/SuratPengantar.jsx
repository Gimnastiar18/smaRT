import React, { useEffect, useState } from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import "../styles/ardi.css";
import moment from 'moment/moment';
import 'moment/locale/id'
import axios from 'axios';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    section: {
        marginVertical: 20,
        marginHorizontal: 30,
        padding: 20,
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 10,
    },
    line: {
        borderBottom: '1px solid black',
        marginVertical: 10,
    },
    tengah: {
        fontSize: 10,
        textAlign: 'center',
    },
    noSurat: {
        fontSize: 12,
        textAlign: 'center',
    },
    isi: {
        fontSize: 12,
        marginTop: 20,
    },
    isiNonMargin: {
        fontSize: 12,
        marginTop: 2,
    },
    ttd: {
        fontSize: 12,
        textAlign: 'right',
    },
    logo: {
        position: 'absolute',
        width: '50px',
        top: '20px',
        left: '20px',
    },
    imgTtd: {
        width: '100px',
        position: 'relative',
        left: '400px',
    }
});

const SuratPengantar = ({id}) => {
    // State untuk menyimpan data dari API
    const [data, setData] = useState([]);

    // Gunakan useEffect untuk melakukan permintaan HTTP saat komponen dimuat
    useEffect(() => {
        // Lakukan permintaan HTTP menggunakan Axios
        axios.get(`http://localhost:3000/arsip-surat/surat/${id}`)
            .then(response => {
                // Set data ke dalam state
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []) // Dependensi kosong agar useEffect hanya dijalankan sekali


    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    {/* kepala surat */}
                    <Image src={'/logo-bekasi.png'} style={styles.logo} />
                    <Text style={styles.title}>SURAT PENGANTAR RT</Text>
                    <Text style={styles.tengah}>KEPALA KELURAHAN WANASARI, RT 11 Wanasari, Cibitung, Bekasi</Text>
                    <Text style={styles.tengah}>Jl. Raya Wanasari No.4</Text>
                    <Text style={styles.tengah}>Telepon : +62 8123456789</Text>

                    <View style={styles.line} />

                    {data.map(item => (
                        <View key={item.id_surat_masuk}>
                            {/* penerima */}
                            <Text style={styles.noSurat}>No. Surat: {item.no_surat}</Text>
                            <Text style={styles.isi}>Bekasi, {moment(item.updated_time).format('LL')}</Text>
                            <Text style={styles.isi}>Kepada Yth.</Text>
                            <Text style={styles.isiNonMargin}>Ketua RT</Text>
                            <Text style={styles.isiNonMargin}>Kelurahan Wanasari</Text>
                            <Text style={styles.isiNonMargin}>Cibitung, Bekasi</Text>


                            <Text style={styles.isi}>Dengan hormat,</Text>
                            <Text style={styles.isi}>Sehubungan dengan permohonan yang diajukan oleh:</Text>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <View>
                                    <Text  style={styles.isi}>Nama</Text>
                                    <Text  style={styles.isiNonMargin}>NIK</Text>
                                    <Text  style={styles.isiNonMargin}>Tempat, Tanggal Lahir</Text>
                                    <Text  style={styles.isiNonMargin}>Jenis Kelamin</Text>
                                    <Text  style={styles.isiNonMargin}>Agama</Text>
                                    <Text  style={styles.isiNonMargin}>Alamat</Text>
                                </View>
                                <View>
                                    <Text  style={styles.isi}>: {item.nama}</Text>
                                    <Text  style={styles.isiNonMargin}>: {item.nik}</Text>
                                    <Text  style={styles.isiNonMargin}>: {item.tempat_lahir}, {moment(item.tanggal_lahir).format('LL')}</Text>
                                    <Text  style={styles.isiNonMargin}>: {item.jenis_kelamin}</Text>
                                    <Text  style={styles.isiNonMargin}>: {item.agama}</Text>
                                    <Text  style={styles.isiNonMargin}>: {item.alamat}</Text>
                                </View>
                            </View>

                            {/* Isi */}
                            <Text style={styles.isi}>Untuk mendapatkan {item.jenis_surat}, saya selaku Ketua RT 11 Kelurahan Wanasari, dengan ini memberikan pengantar sebagai berikut:</Text>
                            <Text style={styles.isiNonMargin}>{item.isi_surat}</Text>
                        </View>
                    ))}

                    {/* Penutup */}
                    <Text style={styles.isi}>Demikian surat pengantar ini kami buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.</Text>
                    <Text style={styles.isi}>Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</Text>

                    {/* TTD */}
                    <Text style={styles.isi}> </Text>
                    <Text style={styles.ttd}>Hormat saya,</Text>
                    <Image src={'/ttd.png'} style={styles.imgTtd}></Image>
                    <Text style={styles.ttd}>Gilang Andri Asto</Text>
                </View>
            </Page>
        </Document>
    )
};

export default SuratPengantar