import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class readData {

	  public ArrayList<String> data;
	  public String csvFile;
	  
	  public readData(String csvFile){
		  this.csvFile = csvFile;
	  }

	  public void run() {

			BufferedReader br = null;
			String line = "";
			boolean flag = false;
			int nominated = 0;
			int won = 0;
			String awards = "";
			String id = "";
			
			try {
				br = new BufferedReader(new FileReader(this.csvFile));
				while ((line = br.readLine()) != null) {
					if(line.contains("<h3>Academy Awards, USA</h3>")){
						flag = true;
					}
					
					if(flag){
						if(line.contains("<h3>") && !line.contains("Academy Awards, USA</h3>")){
							flag=false;
						}else{
							if(line.contains("Won")){
								won++;
								nominated++;
							}else if(line.contains("Nominated")){
								nominated++;
							}else if(line.contains("</a>        <span class=")){
								String movie_name = line.split(">")[1]; 
								awards += "," + (movie_name.substring(0, movie_name.length()-3));
							}
						}
						
					}
				}
				
				if(nominated==0){
					id = (this.csvFile.substring(this.csvFile.length()-11, this.csvFile.length()-4));
					id += ";NA;" + won + ";" + nominated;
				}else{
					awards = awards.substring(1, awards.length());
					id = (this.csvFile.substring(this.csvFile.length()-11, this.csvFile.length()-4));
					id += ";" + awards + ";" + won + ";" + nominated;
				}
				System.out.println(id);
				
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (br != null) {
					try {
						br.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		  }
	  
	  public static void main(String[] args) {
		
		readData obj = new readData(args[0]);
		obj.run();

	  }
	}
