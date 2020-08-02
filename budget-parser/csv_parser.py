import csv
import datetime as dt

nome_arquivo_leitura = '2019_09_01.csv'
arquivo_leitura = csv.reader(open('./arquivos/'+nome_arquivo_leitura, "r", encoding='latin-1'),  delimiter=';')
arquivo_escrita = csv.writer(open('./arquivos/'+'processado_'+nome_arquivo_leitura, "w"),  delimiter=';')
arquivo_escrita.writerow(["Data","Histórico","Docto.","Crédito","Debito","Saldo", ""])
data_arquivo_leitura = dt.datetime.strptime(nome_arquivo_leitura, '%Y_%m_%d.csv')

print('Processando Arquivo ', nome_arquivo_leitura)

capturar_proximo = False
nova_linha = []
for linha in arquivo_leitura:
    print(linha)
    if len(linha) == 1:
        if 'Extrato' in linha[0] or 'Os dados acima' in linha[0] or 'Últimos Lançamentos':
            capturar_proximo = False
            nova_linha = []
            continue
    if len(linha) == 6:
        if 'Data' in linha[0] or 'Total' in linha[1] or dt.datetime.strptime(linha[0], '%d/%m/%y').date().month != data_arquivo_leitura.date().month:
            capturar_proximo = False
            nova_linha = []
            continue
        if capturar_proximo:
                print('>>>>>')
                print(nova_linha)
                arquivo_escrita.writerow(nova_linha)
        capturar_proximo = True
        nova_linha = linha
        continue
    if len(linha) == 7:
        if 'Data' in linha[0] or 'SLADO ANTTERIOR' in linha[1] or dt.datetime.strptime(linha[0], '%d/%m/%y').date().month != data_arquivo_leitura.date().month:
            capturar_proximo = False
            nova_linha = []
            continue
        if capturar_proximo:
                print('>>>>>')
                print(nova_linha)
                arquivo_escrita.writerow(nova_linha)
        capturar_proximo = True
        nova_linha = linha
        continue
    if len(linha) == 4:
        if capturar_proximo:
            nova_linha[1] = nova_linha[1] + ' ' + linha[1]
            print('>>>>>')
            print(nova_linha)
            arquivo_escrita.writerow(nova_linha)
        capturar_proximo = False
        nova_linha = []