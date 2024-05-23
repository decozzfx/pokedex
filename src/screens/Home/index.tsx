import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RootState } from "@/redux/AppStore";
import { SafeScreen } from "@/components/template";
import styles from "./styles";
import {
  TextL,
  TextLG,
  TextM,
  TextS,
  TextXL,
} from "@/components/derivatives/text";
import Gap from "@/components/generics/gap/Gap";
import colors from "@/configs/colors";
import Icon from "react-native-vector-icons/Ionicons";
import {
  CLockOrangeSvg,
  CalendarWhiteSvg,
  ClockBlueSvg,
  ClockWhiteSvg,
  HospitalSvg,
  LocationSvg,
  MedicineSvg,
  ProfilAddSvg,
  SearchSvg,
} from "@/theme/svgs";
import { InputBorder } from "@/components/derivatives/input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IGetDokterTerdekatResponse } from "@/types/commonTypes";

function Home() {
  const dataUser = useSelector((state: RootState) => state.dataUser);
  const [dokterTerdekat, setDokterTerdekat] = useState<
    IGetDokterTerdekatResponse["response"]["dataResponse"] | null
  >(null);

  const { mutate, isPending } = useMutation({
    mutationKey: ["home-dokter-terdekat"],
    mutationFn: async (payload: { lat: string; long: string }) => {
      const response = await fetch(
        "https://nexacaresys.codeplay.id/api/nearby",
        {
          body: JSON.stringify(payload),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${dataUser.token}`,
          },
        }
      );
      if (!response.ok) throw new Error(JSON.stringify(response));
      return response;
    },
  });

  useEffect(() => {
    if (dataUser.token) {
      mutate(
        {
          lat: "",
          long: "",
        },
        {
          onSuccess: async (data) => {
            const response: IGetDokterTerdekatResponse = await data?.json();
            setDokterTerdekat(response.response.dataResponse);
          },
          onError: (error) => {
            console.log("🚀 ~ onError: ~ error", error);
          },
        }
      );
    }
  }, [dataUser?.token]);

  return (
    <SafeScreen>
      <ScrollView style={styles.container}>
        {/* Header Profile */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* Left Content */}
          <View>
            <TextL>Hello,</TextL>
            <TextXL textStyle="bold">Dimas Okva</TextXL>
          </View>

          {/* Right Content */}
          <View>
            <Image
              source={require("@/theme/assets/images/PhotoProfile.png")}
              style={{
                width: 56,
                height: 56,
                resizeMode: "cover",
              }}
            />
          </View>
        </View>

        <Gap height={24} />

        {/* Doctor Profile Recommendation */}
        <TouchableOpacity
          style={{
            padding: 20,
            backgroundColor: colors.base.background,
            borderRadius: 12,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {/* Left Contenct */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={require("@/theme/assets/images/dokter-imran.png")}
                style={{
                  width: 56,
                  height: 56,
                  resizeMode: "cover",
                }}
              />
              <Gap width={12} />
              <View style={{ justifyContent: "space-between" }}>
                <TextL textStyle="bold" line={17.6} color={colors.text.white}>
                  Dr. Imran Syahir
                </TextL>
                <TextM color={colors.text.greyLight}>Dokter Umum</TextM>
              </View>
            </View>

            {/* Right Content */}
            <View style={{ justifyContent: "center" }}>
              <Icon name="chevron-forward" size={24} />
            </View>
          </View>

          {/* Lines */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.15)",
              paddingVertical: 8,
            }}
          />

          {/* Footer */}
          <View
            style={{
              paddingTop: 16,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <CalendarWhiteSvg />
              <Gap width={8} />
              <TextS color={colors.text.white}>Sunday, 12 June</TextS>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingRight: 20,
              }}
            >
              <ClockWhiteSvg />
              <Gap width={8} />
              <TextS color={colors.text.white}>11:00 - 12:00 AM</TextS>
            </View>
          </View>
        </TouchableOpacity>

        <Gap height={24} />

        {/* Seach Doctor */}
        <View>
          <InputBorder
            leftIcon={<SearchSvg />}
            placeholder="Cari Dokter Spesialis"
            value=""
          />
        </View>

        <Gap height={24} />

        {/* Category */}
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <ProfilAddSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Dokter
            </TextM>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <MedicineSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Obat & Resep
            </TextM>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <View
              style={{
                backgroundColor: colors.background.gray2,
                padding: 24,
                borderRadius: 100,
              }}
            >
              <HospitalSvg />
            </View>
            <TextM size={15} color={colors.text.grey}>
              Rumah Sakit
            </TextM>
          </TouchableOpacity>
        </View>

        <Gap height={24} />
        {/* Dokter Terdekat */}
        <TextL textStyle="bold" line={17}>
          Dokter Terdekat
        </TextL>
        <Gap height={16} />

        {isPending && <TextM>Loading...</TextM>}
        {dokterTerdekat && (
          <TouchableOpacity style={styles.cardDokterTerderkat}>
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* Left Contenct */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("@/theme/assets/images/dokter-imran.png")}
                  style={{
                    width: 56,
                    height: 56,
                    resizeMode: "cover",
                  }}
                />
                <Gap width={12} />
                <View style={{ justifyContent: "space-between" }}>
                  <TextL textStyle="bold" line={17.6}>
                    {dokterTerdekat?.nama}
                  </TextL>
                  <TextM color={colors.text.grey}>{dokterTerdekat.jenis}</TextM>
                </View>
              </View>

              {/* Right Content */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <LocationSvg />
                <Gap width={8} />
                <TextM>{dokterTerdekat.jarak}</TextM>
              </View>
            </View>

            {/* Lines */}
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "rgba(245, 245, 245, 1)",
                paddingVertical: 8,
              }}
            />

            {/* Footer */}
            <View
              style={{
                paddingTop: 16,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CLockOrangeSvg />
                <Gap width={8} />
                <TextS>4,8 (120 Reviews)</TextS>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingRight: 20,
                }}
              >
                <ClockBlueSvg />
                <Gap width={8} />
                <TextS>{dokterTerdekat.jadwal}</TextS>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeScreen>
  );
}

export default Home;
